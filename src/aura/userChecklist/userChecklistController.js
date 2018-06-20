({
	onInitLoadChecklist : function(component, event, helper) {
		helper.loadChecklist(component, event, helper);
	},
    onClickNew : function(component, event, helper) {
        console.log("on new button click...");
        //innstantiating the SObject Checklist__c
        var checklistSObject = {"sobjectType":"Checklist__c","Name":"","Type__c":""};
        component.set("v.checklist", checklistSObject);
        component.set("v.isChecklistFound", true);
        helper.createChecklistComponent(component, event, helper);
    }
})