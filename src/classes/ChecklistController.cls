/**
  *  @author        Ketan Arora
  *  @Date          17/06/2018
  *  @Description   controller to save and update the checklist and checklistItem values from Lighning components.  
  *  @name          ChecklistController
  */
public with sharing class ChecklistController{
    /**
      *  @author        Ketan Arora
      *  @Date          17/06/2018
      *  @Description   class to handle Custom Exception.  
      *  @name          ChecklistException 
      */
    public class ChecklistException extends Exception{}
    
    /**
    *  @author        Ketan Arora
    *  @Date          17/06/2018
    *  @Description   Method is used to get the picklist values of Type field from checklist object.
    *  @parameters    -  
    *  @name          getChecklistTypeOptions
    *  @returnType    List<Combobox>
    */
    @AuraEnabled
    public static List<Combobox> getChecklistTypeOptions(){
        List<Combobox> chkTypeOptions = new List<Combobox>();
        if (Schema.SObjectType.Checklist__c.isAccessible()){
            Schema.DescribeFieldResult typeFieldDesc = Checklist__c.Type__c.getDescribe();
            if (typeFieldDesc.IsAccessible()){
                chkTypeOptions.add(new Combobox(Util_Constants.COMBOBOX_DEFALT_VALUE,''));
                for(Schema.PicklistEntry picklistEntry : typeFieldDesc.getPicklistValues()){
                    if (picklistEntry.isActive()){
                        chkTypeOptions.add(new Combobox(picklistEntry.getLabel(), picklistEntry.getValue()));
                    }
                }
            }
        }
        return chkTypeOptions;
    }
    
    /**
    *  @author        Ketan Arora
    *  @Date          17/06/2018
    *  @Description   Method is used to get the checklist for loggeedIn User..
    *  @parameters    -  
    *  @name          getChecklist
    *  @returnType    Checklist__c
    */
    @AuraEnabled
    public static Checklist__c getChecklist(){
        if (Schema.SObjectType.Checklist__c.isAccessible()){
            List<Checklist__c> userChecklist = [SELECT Id, Name, Type__c
                                                  FROM Checklist__c
                                                 WHERE OwnerId = :UserInfo.getUserId()];
            
            if (userChecklist.size() == 1){
                return userChecklist.get(0);
            } else if (userChecklist.size() > 1){
                throw new ChecklistException(Util_Constants.TOO_MANY_RECORDS);
            }
        }
        return null;
    }
    
    /**
    *  @author        Ketan Arora
    *  @Date          17/06/2018
    *  @Description   Method is used to get the checklist Items for given checklist.
    *  @parameters    checklistId id for Master Checklist__c
    *  @name          getChecklistItems
    *  @returnType    List<ChecklistItem__c>
    */
    @AuraEnabled
    public static List<ChecklistItem__c> getChecklistItems(Id checklistId){
        if (Schema.SObjectType.ChecklistItem__c.isAccessible()){
            return [SELECT Id, Name, ChecklistId__c, IsCompleted__c
                      FROM ChecklistItem__c
                     WHERE ChecklistId__c = :checklistId
                     ORDER BY Id];
        }
        return null;
    }
    
    /**
    *  @author        Ketan Arora
    *  @Date          17/06/2018
    *  @Description   Method is used to save checklist and cehcklist Items
    *  @parameters    checklist - checklist record to be saved , checklistItems - related list items to be saved
    *  @name          saveChecklist
    *  @returnType    void
    */
    @AuraEnabled
    public static void saveChecklist(Checklist__c checklist, List<ChecklistItem__c> checklistItems){
        if (Schema.SObjectType.Checklist__c.isCreateable() && Schema.SObjectType.Checklist__c.isUpdateable()
              && Schema.SObjectType.ChecklistItem__c.isCreateable() && Schema.SObjectType.ChecklistItem__c.isUpdateable()){
            //save checklist
            upsert checklist;
            //save checklist items
            List<ChecklistItem__c> checklistItemToUpsert = new List<ChecklistItem__c>();
            if (checklistItems != null && checklistItems.size() > 0){
                for (ChecklistItem__c item : checklistItems){
                    if (item.ChecklistId__c == null){
                        item.ChecklistId__c = checklist.Id;
                    }
                    checklistItemToUpsert.add(item);
                }
                upsert checklistItemToUpsert;
            }
        } else {
            throw new ChecklistException(Util_Constants.EXCEPTION_CONSTANTS);
        }
    }
    
    /**
    *  @author        Ketan Arora
    *  @Date          17/06/2018
    *  @Description   Method is used to update the checkListItem.
    *  @parameters    item - checklistIteem record which needs to be updated. 
    *  @name          updateChecklistItem
    *  @returnType    void
    */
    @AuraEnabled
    public static void updateChecklistItem(ChecklistItem__c item){
        if (Schema.SObjectType.ChecklistItem__c.isUpdateable()){
            update item;
        }
    }
    
}