/**
  *  @author        Ketan Arora
  *  @Date          17/06/2018
  *  @Description   Wrapper class for combobox values .  
  *  @name          Combobox
  */
public class Combobox{

    @AuraEnabled public String label {get; set;}
    @AuraEnabled public String value {get; set;}
   
   /**
    *  @author        Ketan Arora
    *  @Date          17/06/2018
    *  @Description   constructor used to update the combobox values.
    *  @parameters    -  label,value 
    *  @Constructorname -Combobox
    */
    public Combobox(String label, String value){
        this.label = label;
        this.value = value;
    }
}