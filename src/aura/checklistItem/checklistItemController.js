({
    onChecklistItemChange : function(component, event, helper) {
        var itemChangedEvt = component.getEvent("checklistItemChangeEvt");
        console.log("Item number in row : " + component.get("v.itemNumber"));
        itemChangedEvt.setParams({
            "itemNumber": component.get("v.itemNumber"),
            "item": component.get("v.item")
        });
        itemChangedEvt.fire();
    },
    handleCompleteFlagChange : function(component, event, helper) {
		var item = component.get("v.item");
        if (!$A.util.isUndefinedOrNull(item.Id)){
            helper.updateChecklistItemStatus(component, event, helper);
        }
	}
})