({
    loadChecklist : function(component, event, helper){
		var action = component.get("c.getChecklist");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var checklistRecord = response.getReturnValue();
                if (!$A.util.isUndefinedOrNull(checklistRecord)){
                    component.set("v.isChecklistFound", true);
                    component.set("v.checklist", checklistRecord);
                    helper.createChecklistComponent(component,event,helper);
                } else {
                    component.set("v.isChecklistFound", false);
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
    createChecklistComponent : function(component, event, helper){
        console.log("creating checklist component... ");
        $A.createComponent(
            "c:checklist",
            { 
                "checklist" : component.get("v.checklist")
            },
            function(checklistCmp, status, errorMessage){
                if (status === "SUCCESS") {
                    component.set("v.body", checklistCmp);
                }
                else {
                    console.log(errorMessage);
                }
            }
        );
    }
})