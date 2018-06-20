({
	createRow : function(component, itemIndex, item) {
        var tableRows = component.get("v.tableRows");
        console.log("creating row " + itemIndex);
        $A.createComponent(
            "c:checklistItem",{
                "itemNumber" : itemIndex,
                "item" : item
            },
            function(newRow, status, errorMessage){
                if (status === "SUCCESS") {
                    tableRows.push(newRow);
                    component.set("v.tableRows", tableRows);
                }
                else {
                    console.log(status + " : " + errorMessage);
                }
            }
        );
	},
    updateChecklistItemValue : function(component, event, helper){
        var updatedIndex = event.getParam("itemNumber");
        var updatedItem = event.getParam("item");
        console.log("Item number in table : " + updatedIndex);
		
        var checklistItems = component.get("v.items");

        var itemIndex = 0;
        for (var i = 0; i < checklistItems.length; i++){
            if (itemIndex == updatedIndex){
                checklistItems[i] = updatedItem;
                console.log("Value updated ...");
		    }
            itemIndex++;
        }
        
        component.set("v.items", checklistItems);
        event.stopPropagation();
        helper.raiseChecklistItemsChangedEvent(component, event);
    },
    raiseChecklistItemsChangedEvent : function(component, event){
        var allItemsChangedEvt = component.getEvent("allChecklistItemsChangeEvt");
        allItemsChangedEvt.setParams({
            "checklistItems": component.get("v.items")
        });
        allItemsChangedEvt.fire();
    }
})