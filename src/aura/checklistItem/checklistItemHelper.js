({
	updateChecklistItemStatus : function(component, event, helper) {
        var action = component.get("c.updateChecklistItem");
        action.setParams({
            "item": component.get("v.item")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                helper.raiseToast("success", "Checklist item completion status has been updated.");
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
    }
})