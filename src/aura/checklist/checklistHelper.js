({
	loadChecklistTypeOptions : function(component, event, helper) {
        var action = component.get("c.getChecklistTypeOptions");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.typeOptions", response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.log("Server side request canot be completed.");
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error : " + errors[0].message);
                    }
                }
            }
        });
        $A.enqueueAction(action);
	},
	loadChecklistItems : function(component, event, helper) {
        console.log("loading checklist items...");
        var checklist = component.get("v.checklist");
        var action = component.get("c.getChecklistItems");
        action.setParams({
            "checklistId": checklist.Id
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var checklistItems = response.getReturnValue();
                console.log("Checklist items : " + checklistItems);
                if (!$A.util.isUndefinedOrNull(checklistItems)){
                    component.set("v.hasChecklistItems",true);
                    component.set("v.checklistItems", checklistItems);
                    helper.createChecklistItemsComponent(component, event, helper);
                }
            }
            else if (state === "INCOMPLETE") {
                console.log("Server side request canot be completed.");
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error : " + errors[0].message);
                    }
                }
            }
        });
        $A.enqueueAction(action);
	},
    createChecklistItemsComponent : function(component, event, helper){
        $A.createComponent(
            "c:checklistItemTable",{
                "items" : component.get("v.checklistItems")
            },
            function(chkItemCmp, status, errorMessage){
                if (status === "SUCCESS") {
                    component.set("v.checklistItemTable", chkItemCmp);
                }
            }
        );
    },
    saveChangesToDB : function(component,event,helper){
        var action = component.get("c.saveChecklist");
        action.setParams({
            "checklist": component.get("v.checklist"),
            "checklistItems": component.get("v.checklistItems")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                helper.raiseToast("success", "Checklist changes saved successfully");
            }
            else if (state === "INCOMPLETE") {
                helper.raiseToast("error", "Server side request canot be completed.");
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        helper.raiseToast("error", errors[0].message);
                    }
                }
            }
        });
        $A.enqueueAction(action);
    },
    raiseToast : function(toastType, toastMessage){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": toastType,
            "message": toastMessage
        });
        toastEvent.fire();
    },
    raiseReloadEvent : function(component, event){
        var reloadChklistEvt = component.getEvent("checklistReloadEvt");
        reloadChklistEvt.fire();

    }
})