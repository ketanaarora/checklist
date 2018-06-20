/**
  * @author        Ketan Arora 
  * @Name          Util_TestDataCreation 
  * @Created date  19/06/2018
  * @description   Test data class 
  * @Version       1.0
**/
@isTest
public without sharing class Util_TestDataCreation {

    /*method to create checklist test data*/
    public static checklist__c createChecklist(){
        checklist__c checklist = new checklist__c ();
        checklist.Name = 'Test Checklist';
        checklist.Type__c = 'Action Items';
        
        return checklist;
    }

    /*method to create checklistItem test data*/
    public static ChecklistItem__c createChecklistItem(Id checklistId){
        ChecklistItem__c checklistItem = new ChecklistItem__c ();
        checklistItem.Name = 'Test Checklist Item';
        checklistItem.ChecklistId__c = checklistId;
        checklistItem.IsCompleted__c = False;
        return checklistItem;
    }
            
}