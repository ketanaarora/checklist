/**
  * @author        Ketan Arora 
  * @Name          ChecklistController_Test
  * @Created date  19/06/2018
  * @description   Test class for ChecklistController
  * @Version       1.0
**/
@isTest
private class ChecklistController_Test{
  

  /**
    * @author        Ketan Arora 
    * @Name          testMethod1
    * @Created date  19/06/2018
    * @description   Test method for ChecklistController_Test
    * @Version       1.0
  **/
  private static testmethod void testMethod1(){
    checklist__c checklist = Util_TestDataCreation.createChecklist();
    Database.insert(checklist);
    Test.startTest();  
    ChecklistController.getChecklistTypeOptions();
    ChecklistController.getChecklist();
    Test.stopTest();
    System.assertNotEquals(checklist.id,null);
  }

  /**
    * @author        Ketan Arora 
    * @Name          testMethod2
    * @Created date  19/06/2018
    * @description   Test method for ChecklistController_Test
    * @Version       1.0
  **/
  private static testmethod void testMethod2(){
    checklist__c checklist = Util_TestDataCreation.createChecklist();
    Database.insert(checklist);
    ChecklistItem__c checklistItem = Util_TestDataCreation.createChecklistItem(checklist.Id);    
    Database.insert(checklistItem);
    List<ChecklistItem__c> checklistItems = new List<ChecklistItem__c>();
    checklistItems.add(checklistItem);
    Test.startTest();  
    ChecklistController.getChecklist();
    ChecklistController.getChecklistItems(checklist.Id);
    ChecklistController.saveChecklist(checklist , checklistItems);
    checklistItem.isCompleted__C = True;
    ChecklistController.updateChecklistItem(checklistItem);
    Test.stopTest();
    System.assertNotEquals(checklistItem.id,null);
    System.assertEquals(checklistItem.isCompleted__C,True);
  }

}