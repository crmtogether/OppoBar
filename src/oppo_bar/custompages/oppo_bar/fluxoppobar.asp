<!-- #include file ="SageCRM_Portal.js" -->
<%

try{
  Response.Clear();
  Response.ContentType = "application/json";
  
  var sql="select Capt_US from Custom_Captions where capt_family = 'Oppo_Stage' and Capt_Code not in ( 'OnHold', 'Cancelled') and Capt_Deleted is null order by Capt_Order ";
  var obj=CRM.CreateQueryObj(sql);
  obj.SelectSQL();
 
  Response.Write("{ \"Oppo_Stages\": [");
  while (!obj.eof)
  { 
    Response.Write("{");
	Response.Write("\"oppo_stage\":\"" + obj.FieldValue("Capt_US") + "\"");
	//Response.Write("\"user_fullname\":\"" + obj.FieldValue("User_FirstName") + " " + obj.FieldValue("User_LastName") + "\"");
	Response.Write("}");
	obj.NextRecord();   
	if (!obj.eof)
		Response.Write(",");
  }
  Response.Write("]}");
   
}catch(e){ 
  Response.Write(e.message);
  Response.Write("-1");//failed
}
Response.End;
%>
