({
	onInitLoadRows : function(component, event, helper) {
        component.set("v.tableRows", []);
		var checklistItems = component.get("v.items");

        var itemIndex = 0;
        for (var i = 0; i < checklistItems.length; i++){
            helper.createRow(component, itemIndex, checklistItems[i]);
            itemIndex++;
        }
        
        if (checklistItems.length == 0){
            var noRowSection = component.find("noRowsFoundSection");
            $A.util.removeClass(noRowSection, "slds-hide");
        }
	},
    onAddRow : function(component, event, helper){
        var noRowSection = component.find("noRowsFoundSection");
        $A.util.addClass(noRowSection, "slds-hide");
        
        var newItem = {"sobjectType":"ChecklistItem__c","Name":"","IsCompleted__c":false};
		var checklistItems = component.get("v.items");
        
        checklistItems.push(newItem);
        component.set("v.items", checklistItems);
        
        var newItemIndex = (checklistItems.length - 1);
        helper.createRow(component, newItemIndex, newItem);
        
        helper.raiseChecklistItemsChangedEvent(component, event);
	},
    onChecklistItemChange : function(component, event, helper){
        helper.updateChecklistItemValue(component, event, helper);
 	},
})