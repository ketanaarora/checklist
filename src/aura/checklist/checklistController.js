({
	onInitLoadContents : function(component, event, helper) {
		var checklist = component.get("v.checklist");
        helper.loadChecklistTypeOptions(component, event, helper);
        console.log(checklist.Id);
        if (!$A.util.isUndefinedOrNull(checklist.Id)){
            helper.loadChecklistItems(component, event, helper);
        } else {
            component.set("v.isChecklistChanged", true);
        }
    },
    onChecklistChange : function(component, event, helper) {
        component.set("v.isChecklistChanged", true);
    },
    onSaveChanges : function(component, event, helper) {
        helper.saveChangesToDB(component, event, helper);
        helper.raiseReloadEvent(component, event);
    },
    onCancelChanges : function(component, event, helper) {
        helper.raiseReloadEvent(component, event);
    },
    onAllChecklistItemsChange : function(component, event, helper) {
        var checklistItems = event.getParam("checklistItems");
        component.set("v.checklistItems", checklistItems);
        component.set("v.hasChecklistItems", true);
        component.set("v.isChecklistChanged", true);
    },
})