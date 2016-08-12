<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="People.aspx.cs" Inherits="Boutique.AdminPanel.People" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
    <script>
       
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/People.css" rel="stylesheet" />
      <link href="../CSS/Common.css" rel="stylesheet" />
     <link href="../CSS/DataTables-1.10.4/css/jquery.dataTables.css" rel="stylesheet" />
      <script src="../Scripts/custom.js"></script>
      <script src="../Scripts/jquery.dataTables-1.10.12.js"></script>
   <%-- <script src="../Scripts/jquery.dataTables.min.js"></script>--%>
    <script src="../Scripts/jquery.validate.min-1.15.0.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/People.js"></script>
    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="DashBoard.aspx">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">People</a></li>
        </ul>

        <div class="row-fluid"><span class="headerStyle">People</span></div>

        <div class="row-fluid" style="height: 3px;"></div>

        <%--Alert boxes --%>
        <div class="row-fluid" id="rowfluidDiv" style="display: none;">
            <div class="box span12">

                <div class="box-content alerts">
                    <div class="alert alert-error" style="display: none;">
                     
                        <strong>Operation Not Successfull.</strong>
                    </div>
                    <div class="alert alert-success" style="display: none;">
                     
                        <strong>Successfull.</strong>
                    </div>
                
                </div>

            </div>
        </div>

        <%--Alert boxes --%>


        <%--Tab Content--%>
        <div class="row-fluid">

            <div class="box span12">
                <div class="box-header">
                </div>
                <div class="box-content">
                    <ul class="nav tab-menu nav-tabs" id="myTab">
                        <li class="icon active"> <a id="idTabAdministrator" href="#Administrators">♔ Administrators</a></li>
                        <li><a id="idTabManagers" href="#Managers"><span class="icon-user"></span> Managers</a></li>
                        <li><a id="idTabDesigners" href="#Designers">♝ Designers</a></li>
                        <li><a id="idTabUsers" href="#Users"> <span class="icon-group"></span> Users</a></li>
                    </ul>

                    <div id="myTabContent" class="tab-content">

                        <div class="tab-pane active" id="Administrators">
                            <div class="row-fluid">


                                <div class="box-content">
                                    <div id="NewAdmin" runat="server" class="box span6">
                                        <div class="box-header">
                                            <h2 id="editAdminLabel">New Administrator</h2>
                                            <div class="box-icon">
                                            </div>
                                        </div>

                                        <div class="box-content" style="min-height: 448px;">
                                            <div class="form-horizontal">
                                                <div class="alert alert-error" id="ErrorBox1" style="display:none;">
                                                <div id="Displaydiv1">

                                                </div>
                                                </div>
                                                <%--<fieldset>--%>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Name</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Admin Name" id="txtAdminName" type="text" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Mobile</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Mobile Number" id="txtMobileAdmin" type="text" onkeypress="return isNumber(event)" />
                                                    </div>
                                                </div>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">LoginName</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Login Name" id="txtAdminLoginName" type="text" />
                                                           <label class="control-label"  id="lblAdminLoginName" style=" padding-left:10px; display:none;" />
                                                    </div>
                                                </div>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Password</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Password" id="txtAdminPass" type="password" />
                                                    </div>
                                                </div>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Confirm Password</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Confirm Password" id="txtAdminConPass" type="password" onkeyup="PassowrdEqualityCheck1();" />
                                                    </div>
                                                </div>


                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Email</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Email" onkeyup=" return EmailValidation();" id="txtAdminEmail" type="text" />
                                                        <img id="imgfail" style="display:none"  src="../img/Default/newClose.png" />
                                                        <img id="imgsuccess" style="display:none" src="../img/Default/newfff.png" />

                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label">Is Acitive?</label>
                                                    <div class="controls">
                                                      <%--  <label class="checkbox inline">
                                                          
                                                         <input type="checkbox" id="chkActiveAdmin" checked="checked" />Yes</label>--%>
                                                         <label class="radio">
								                      	<input type="radio" name="AoptionsRadiosActive" id="AOptIsActiveYes" value="true" checked=""/>
								                        Yes
								                        </label>
								
								                     <label class="radio">
								                      	<input type="radio" name="AoptionsRadiosActive" id="AOptIsActiveNo" value="false"/>
								                         	No
							                    	 </label>

                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                        <footer class="InnerFooter">
                                            <a class="btn btn-primary AddAdmin" onclick="return AdminValidation()" href="#">Save</></a>
                                            <a class="btn CancelAdmin">Clear</a>
                                        </footer>

                                    </div>

                                    <%--  Grid User--%>

                                    <div class="box span6">
                                        <div class="box-header">
                                            <h2>Current Administrators</h2>
                                            <div class="box-icon">
                                            </div>
                                        </div>
                                        <div class="box-content TableLayout" style="height: 500px; overflow: auto;">
                                            <table class="table table-striped table-bordered  bootstrap-datatable" id="AdministratorTable">
                                                <thead id="thead">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Mobile</th>
                                                        <th>Email</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="Adminrows">
                                               </tbody>
                                            </table>

                                        </div>



                                    </div>

                                </div>


                            </div>
                        </div>

                        <div class="tab-pane" id="Managers">

                            <div class="row-fluid">

                                <div class="box-content">
                                    <div id="NewManager" runat="server" class="box span6">
                                        <div class="box-header">
                                            <h2 id="editManagerLabel">New Manager</h2>
                                            <div class="box-icon">
                                            </div>
                                        </div>

                                        <div class="box-content" style="min-height: 448px;">
                                            <div class="form-horizontal">
                                                <div class="alert alert-error" id="ErrorBox" style="display:none;">
                                                  <div id="Displaydiv">

                                                  </div>
                                                  </div>
                                                <%--<fieldset>--%>


                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Name</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Manager Name" id="txtManagerName" type="text" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Mobile</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Mobile Number" id="txtManagerMobile" type="text" onkeypress="return isNumber(event)" />
                                                    </div>
                                                </div>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">LoginName</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Login Name" id="txtManagerLoginName" type="text" />
                                                           <label class="control-label"  id="lblManagerLoginName" style=" padding-left:10px; display:none;" />
                                                    </div>
                                                </div>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Password</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Password" id="txtManagerPass" type="password" />
                                                    </div>
                                                </div>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Confirm Password</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Confirm Password" id="txtManagerConPass" onkeyup="PassowrdEqualityCheck();" type="password" />
                                                    </div>
                                                </div>


                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Email</label>
                                                    <div class="controls">
                                                     <input class="input-large focused" name="Email" onkeyup=" return EmailValidation();" id="txtManagerEmail" type="text" />
                                                        <img id="imgfail1" style="display:none"  src="../img/Default/newClose.png" />
                                                        <img id="imgsuccess1" style="display:none" src="../img/Default/newfff.png" />

                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label">Is Acitive?</label>
                                                   
                                                     
                                                         <div class="controls">
                                                               <%-- <label class="checkbox inline">
                                                            <input type="checkbox" id="chkActiveManager" checked />Yes</label>--%>
                                                        <label class="radio">
								                      	<input type="radio" name="MoptionsRadiosActive" id="MOptIsActiveYes" value="true" checked=""/>
								                        Yes
								                        </label>
								
								                     <label class="radio">
								                      	<input type="radio" name="MoptionsRadiosActive" id="MOptIsActiveNo" value="false"/>
								                         	No
							                    	 </label>
                                                   

                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                        <footer class="InnerFooter">
                                            <a class="btn btn-primary AddManager" onclick="return ManagerValidation()" href="#">Save</></a>
                                            <a class="btn CancelManager">Clear</a>
                                        </footer>

                                    </div>

                                    <%--  Grid User--%>

                                    <div class="box span6">
                                        <div class="box-header">
                                            <h2>Current Managers</h2>
                                            <div class="box-icon">
                                            </div>
                                        </div>
                                        <div class="box-content TableLayout" style="height: 500px; overflow: auto;">
                                           <table class="table table-striped table-bordered  bootstrap-datatable" id="ManagerTable">
                                                <thead id="managerthead">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Mobile</th>
                                                        <th>Email</th>
                                                        <th>Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody id="Managerrows">
                                                </tbody>
                                            </table>

                                        </div>



                                    </div>

                                </div>


                            </div>
                        </div>

                        <div class="tab-pane" id="Designers">
                            <div class="row-fluid">

                                <div class="box-content">

                                    <div id="NewDesigner" runat="server" class="box span6">
                                        <div class="box-header">
                                            <h2 id="editDesignerLabel">New Designer</h2>
                                            <div class="box-icon">
                                            </div>
                                        </div>

                                        <div class="box-content" style="min-height: 448px; overflow: auto;">
                                            <div class="form-horizontal">
                                                <div class="alert alert-error" id="ErrorBox2" style="display:none;">
                                                  <div id="Displaydiv2">

                                                  </div>
                                                  </div>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Name</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Designer Name" id="txtDesignerName" type="text" />
                                                    </div>
                                                </div>

                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Mobile</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Mobile Number" id="txtDesignerMobile" type="text" onkeypress="return isNumber(event)" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Profile</label>
                                                    <div class="controls">
                                                        <textarea class="form-control" style="max-width: 68%" rows="4" id="txtDesignerProfile"></textarea>
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Photo</label>
                                                    <div class="controls">
                                     
                                                        <input id="fileUpload" type="file" size="60" name="myfile" />

                                                    </div>
                                                </div>


                                                <div class="control-group">
                                                    <div class="controls">
                                                        <output id="list" class="listClass"></output>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <footer class="InnerFooter">
                                            <a class="btn btn-primary AddDesigner" onclick="return DesignerValidate()" href="#">Save</></a>
                                            <a class="btn CancelDesigner">Clear</a>
                                        </footer>

                                    </div>

                                    <%--  Grid Designers--%>
                                    <div class="box span6">
                                        <div class="box-header">
                                            <h2>Current Designers</h2>
                                            <div class="box-icon">
                                            </div>
                                        </div>
                                        <div class="box-content TableLayout " style="height: 500px; overflow: auto;">
                                            <table class="table table-striped table-bordered  bootstrap-datatable" id="DesignerTable">
                                                <thead id="Designthead">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Mobile</th>
                                                        <th>Profile</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="Designerrows">
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                    <%--  Grid Designers--%>
                                </div>
                            </div>

                        </div>

                        <div class="tab-pane" id="Users">

                            <div class="row-fluid">

                                <div class="box-content">
                                    <div id="NewUser" runat="server" class="box span6">
                                        <div class="box-header">
                                            <h2>Edit User</h2>
                                            <div class="box-icon">
                                            </div>
                                        </div>

                                        <div class="box-content" style="min-height: 448px; overflow: auto;">
                                            <div class="form-horizontal">
                                                <div class="alert alert-error" id="ErrorBox3" style="display:none;">
                                                  <div id="Displaydiv3">

                                                  </div>
                                                  </div>
                                                <%--<fieldset>--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Name</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" id="txtName" type="text" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Mobile</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" id="txtMobile" type="text"  onkeypress="return isNumber(event)"/>
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Email</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" id="txtEmail" type="text" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label">Is Acitive?</label>
                                                    <div class="controls">
                                                        <label class="radio">
								                      	<input type="radio" name="optionsRadiosActive" id="OptIsActiveYes" value="true" checked=""/>
								                        Yes
								                        </label>
								
								                     <label class="radio">
								                      	<input type="radio" name="optionsRadiosActive" id="OptIsActiveNo" value="false"/>
								                         	No
							                    	 </label>
                                                    </div>
                                                </div>



                                                <div class="control-group">
                                                    <label class="control-label" for="date01">DOB</label>
                                                    <div class="controls">
                                                        <input type="text" class="input-large datepicker" id="dateDOB" value="" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="date01">Anniversary</label>
                                                    <div class="controls">
                                                        <input type="text" class="input-large datepicker" id="dateAnniversary" value="" />
                                                    </div>
                                                </div>

                                            </div>



                                        </div>
                                        <footer class="InnerFooter">

                                            <a class="btn btn-primary AddUser" onclick="return UserValidate()" href="#">Save</></a>

                                            <a class="btn CancelUser">Clear</a>

                                        </footer>

                                    </div>

                                    <%--  Grid User--%>

                                    <div class="box span6">
                                        <div class="box-header">
                                            <h2>Current Users</h2>
                                            <div class="box-icon">
                                            </div>
                                        </div>
                                        <div class="box-content TableLayout" style="height: 500px; overflow: auto;">
                                            <table class="table table-striped table-bordered  bootstrap-datatable" id="UsersTable">
                                                <thead id="Usersthead">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Mobile</th>
                                                        <th>Email</th>
                                                        <th>Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody id="Usersrows">
                                                </tbody>
                                            </table>

                                        </div>



                                    </div>

                                </div>

                                <%--  Grid User--%>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <!--/span-->

        </div>
        <%--Tab Content--%>
    </div>


    <input type="hidden" id="hdfBoutiqueID" value="" />
    <input type="hidden" id="hdfUserID" value="" />
    <input type="hidden" id="hdfAdminID" value="" />
    <input type="hidden" id="hdfRole" value="" />
    <input type="hidden" id="hdfloginname" value="" />
    <input type="hidden" id="hdfOwnerID" value="" />
    <input type="hidden" id="hdfCardNo" value="" />
    <input type="hidden" id="hdfDesignerID" value="" />
      <input type="hidden" id="hdfMobile" value="" />
        <input type="hidden" id="hdfEmailEditVerify" value="" />


</asp:Content>
