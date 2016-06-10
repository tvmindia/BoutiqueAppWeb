<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="People.aspx.cs" Inherits="Boutique.AdminPanel.People" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script>
        function PassowrdEqualityCheck1() {
            debugger;
           // if (document.getElementById('txtAdminConPass').value != "")
          //  {
                if (document.getElementById('txtAdminPass').value != document.getElementById('txtAdminConPass').value) {
                    document.getElementById('txtAdminConPass').className = "alert alert-error";
                }

                else {
                    document.getElementById('txtAdminConPass').className = "alert alert-success";
                }
           // }
        }
        function PassowrdEqualityCheck() {
            debugger;
            if (document.getElementById('txtManagerPass').value != document.getElementById('txtManagerConPass').value) {
                document.getElementById('txtManagerConPass').className = "alert alert-error";
            }

            else {
                document.getElementById('txtManagerConPass').className = "alert alert-success";
            }

        }

    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/People.css" rel="stylesheet" />
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

          <div class="row-fluid" style="height:3px;"></div>

        <%--Alert boxes --%>
        <div class="row-fluid" id="rowfluidDiv" style="display: none;">
            <div class="box span12">

                <div class="box-content alerts">
                    <div class="alert alert-error" style="display: none;">
                        <%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
                        <strong>Operation Not Successfull.</strong>
                    </div>
                    <div class="alert alert-success" style="display: none;">
                        <%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
                        <strong>Successfull.</strong>
                    </div>
                    <div class="alert alert-info" style="display: none;">
                        <%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
                        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                    </div>
                    <div class="alert alert-block" style="display: none;">
                        <%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
                        <h4 class="alert-heading">Warning!</h4>
                        <p>Best check yourself, you're not looking too good.</p>
                    </div>
                </div>

            </div>
        </div>

        <%--Alert boxes --%>


        <div class="row-fluid">

            <div class="box-header">
                <h2>Administrator</h2>
                <div class="box-icon">
                    <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                    <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
                    <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                </div>
            </div>
            <div class="box-content">
                <div id="NewAdmin" runat="server" class="box span6">
                    <div class="box-header">
                        <h2>New Administrator</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%-- <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>

                   <div class="box-content" style="height:438px;">
						<div class="form-horizontal">
							<%--<fieldset>--%>

							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtAdminName" type="text"/>
								</div>
								</div>
							
							  <div class="control-group">
								 <label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" id="txtMobileAdmin" type="text"/>
								</div>
								</div>

                              <div class="control-group">
							
								  <label class="control-label" for="focusedInput">LoginName</label>
								<div class="controls">
								  <input class="input-large focused" id="txtAdminLoginName" type="text"/>
								</div>
								</div>

                              <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Password</label>
								<div class="controls">
								  <input class="input-large focused" id="txtAdminPass" type="password"/>
								</div>
								</div>

                              <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Confirm Password</label>
								<div class="controls">
								  <input class="input-large focused" id="txtAdminConPass" onkeyup="PassowrdEqualityCheck1();" type="password"/>
								</div>
								</div>


                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused" id="txtAdminEmail" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								<label class="control-label">Is Acitive?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkActiveAdmin" checked/>Yes</label>
								
								</div>
							  </div>
                            
						</div>
                        
                             
                        </div>
                      <footer class="InnerFooter">
                                <a class="btn btn-primary AddAdmin" href="#">Save</></a>
                                <a class="btn CancelAdmin">Cancel</a>
             			       </footer> 

                </div>

                <%--  Grid User--%>

                <div class="box span6">
                    <div class="box-header">
                        <h2>Current Administrator</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%--   <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>
                    <div class="box-content TableLayout" style="height: 490px; overflow: auto;">
                        <table class="table table-striped table-bordered  bootstrap-datatable" id="AdministratorTable">
                            <thead id="thead" >
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
                        <%-- <div class="pagination pagination-centered">
						  <ul>
							<li><a href="#">Prev</a></li>
							<li class="active">
							  <a href="#">1</a>
							</li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">Next</a></li>
						  </ul>
						</div>     --%>
                    </div>



                </div>

            </div>

           
        </div>

        <div class="row-fluid" style="height:10px"></div>

        <div class="row-fluid">

            <div class="box-header">
                <h2>Manager</h2>
                <div class="box-icon">
                    <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                    <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
                    <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                </div>
            </div>
            <div class="box-content">
                <div id="NewManager" runat="server" class="box span6">
                    <div class="box-header">
                        <h2>New Manager</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%-- <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>

                   <div class="box-content" style="height:438px;">
						<div class="form-horizontal">
							<%--<fieldset>--%>

                
							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtManagerName" type="text"/>
								</div>
								</div>
							
							  <div class="control-group">
								 <label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" id="txtManagerMobile" type="text"/>
								</div>
								</div>

                             <div class="control-group">
							
								  <label class="control-label" for="focusedInput">LoginName</label>
								<div class="controls">
								  <input class="input-large focused" id="txtManagerLoginName" type="text"/>
								</div>
								</div>

                              <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Password</label>
								<div class="controls">
								  <input class="input-large focused" id="txtManagerPass" type="password"/>
								</div>
								</div>

                              <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Confirm Password</label>
								<div class="controls">
								  <input class="input-large focused" id="txtManagerConPass" onkeyup="PassowrdEqualityCheck();" type="password"/>
								</div>
								</div>


                              <div class="control-group">
								 <label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused" id="txtManagerEmail" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								<label class="control-label">Is Acitive?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkActiveManager" checked/>Yes</label>
								
								</div>
							  </div>
                            
						</div>
                        
                             
                        </div>
                      <footer class="InnerFooter">
                                <a class="btn btn-primary AddManager" href="#">Save</></a>
                                <a class="btn CancelManager">Cancel</a>
             			       </footer> 

                </div>

                <%--  Grid User--%>

                <div class="box span6">
                    <div class="box-header">
                        <h2>Current Managers</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%--   <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>
                    <div class="box-content TableLayout" style="height: 490px; overflow: auto;">
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
                        <%-- <div class="pagination pagination-centered">
						  <ul>
							<li><a href="#">Prev</a></li>
							<li class="active">
							  <a href="#">1</a>
							</li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">Next</a></li>
						  </ul>
						</div>     --%>
                    </div>



                </div>

            </div>

           
        </div>
   

        <div class="row-fluid" style="height:10px"></div>

        <div class="row-fluid">

            <div class="box-header">
                <h2>Designer</h2>
                <div class="box-icon">
                    <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                    <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
                    <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                </div>
            </div>
            <div class="box-content">

                <div id="NewDesigner" runat="server" class="box span6">
                    <div class="box-header">
                        <h2>New Designer</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%--   <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>

                    <div class="box-content" style="height: 250px; overflow: auto;">
                        <div class="form-horizontal">

                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Name</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtDesignerName" type="text" />
                                </div>
                            </div>

                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Mobile</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtDesignerMobile" type="text" />
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
                                  <%--  <iframe id="IframeProjectSwitching" src="PhotoUploader.aspx" style="width: 250px;min-height:195px;max-height:350px;overflow-y:hidden;overflow-x:hidden;border:none"></iframe> --%>
                                    <input id="fileUpload" type="file" size="60" name="myfile"/>
                                    
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
                        <a class="btn btn-primary AddDesigner" href="#">Save</></a>
                        <a class="btn CancelDesigner">Cancel</a>
                    </footer>

                </div>

                <%--  Grid Designers--%>
                <div class="box span6">
                    <div class="box-header">
                        <h2>Current Designers</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%--<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>
                    <div class="box-content TableLayout " style="height: 305px; overflow: auto;">
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
                        <%-- <div class="pagination pagination-centered">
						  <ul>
							<li><a href="#">Prev</a></li>
							<li class="active">
							  <a href="#">1</a>
							</li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">Next</a></li>
						  </ul>
						</div>     --%>
                    </div>
                </div>
                <%--  Grid Designers--%>
            </div>
        </div>

          <div class="row-fluid" style="height:10px"></div>

        <div class="row-fluid">

            <div class="box-header">
                <h2>User</h2>
                <div class="box-icon">
                    <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                    <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
                    <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                </div>
            </div>
            <div class="box-content">
                <div id="NewUser" runat="server" class="box span6">
                    <div class="box-header">
                        <h2>Edit User</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%-- <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>

                    <div class="box-content" style="height: 438px; overflow: auto;">
                        <div class="form-horizontal">
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
                                    <input class="input-large focused" id="txtMobile" type="text" />
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
                                    <label class="checkbox inline">
                                        <input type="checkbox" class="chkActive" id="chkActive" value="option1" />Yes</label>
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

                        <a class="btn btn-primary AddUser" href="#">Save</></a>

                        <a class="btn CancelUser">Cancel</a>

                    </footer>

                </div>

                <%--  Grid User--%>

                <div class="box span6">
                    <div class="box-header">
                        <h2>Current Users</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%--   <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>
                    <div class="box-content TableLayout" style="height: 490px; overflow: auto;">
                        <table class="table table-striped table-bordered  bootstrap-datatable" id="UsersTable">
                            <thead id="Usersthead">
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th style="width: 105px;">Actions</th>

                                </tr>
                            </thead>
                            <tbody id="Usersrows">
                            </tbody>
                        </table>
                        <%-- <div class="pagination pagination-centered">
						  <ul>
							<li><a href="#">Prev</a></li>
							<li class="active">
							  <a href="#">1</a>
							</li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">Next</a></li>
						  </ul>
						</div>     --%>
                    </div>



                </div>

            </div>

            <%--  Grid User--%>
        </div>

    </div>


    <input type="hidden" id="hdfBoutiqueID" value="" />
    <input type="hidden" id="hdfUserID" value="" />
    <input type="hidden" id="hdfAdminID" value="" />
     <input type="hidden" id="hdfRole" value="" />
    <input type="hidden" id="hdfOwnerID" value="" />
    <input type="hidden" id="hdfCardNo" value="" />
    <input type="hidden" id="hdfDesignerID" value="" />

</asp:Content>
