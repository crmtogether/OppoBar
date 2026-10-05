<!-- #include file ="SageCRM_Portal.js" -->
<%

try{
  Response.Clear();
  Response.ContentType = "application/json";
  
  var sql="select User_FirstName,User_LastName,User_UserId from users where user_resource = 'False' and User_Disabled is NULL";
  var obj=CRM.CreateQueryObj(sql);
  obj.SelectSQL();
 
  Response.Write("{ \"users\": [");
  while (!obj.eof)
  { 
    Response.Write("{");
	Response.Write("\"user_userid\":" + obj.FieldValue("User_UserId") + ",");
	Response.Write("\"user_fullname\":\"" + obj.FieldValue("User_FirstName") + " " + obj.FieldValue("User_LastName") + "\"");
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
