﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="People.aspx.cs" Inherits="Boutique.AdminPanel.People" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/People.css" rel="stylesheet" />
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
                <h2>Owner</h2>
                <div class="box-icon">
                    <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                    <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
                    <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                </div>
            </div>
            <div class="box-content">


                <div class="box span6">
                    <div class="box-header">
                        <h2>New Owner</h2>
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
                                    <input class="input-large focused" id="txtOwnerName" type="text" />
                                </div>
                            </div>


                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Address</label>
                                <div class="controls">
                                    <textarea class="form-control" style="max-width: 68%" rows="4" id="txtOwnerAddress"></textarea>
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Phone</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtPhone" type="text" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Email</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtOwnerEmail" type="text" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="date01">DOB</label>
                                <div class="controls">
                                    <input type="text" class="input-large datepicker" id="DOBDate" value="" />
                                </div>
                            </div>



                            <div class="control-group">
                                <label class="control-label">Gender</label>
                                <div class="controls">
                                    <label class="radio">
                                        <input type="radio" name="optionsRadios" id="radioMale" value="option1" checked="" />
                                        Male
                                    </label>
                                    <div style="clear: both"></div>
                                    <label class="radio">
                                        <input type="radio" name="optionsRadios" id="radioFemale" value="option2" />
                                        Female
                                    </label>
                                </div>
                            </div>



                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Profile</label>
                                <div class="controls">
                                    <textarea class="form-control" style="max-width: 68%" rows="4" id="txtProfile"></textarea>
                                </div>
                            </div>





                        </div>


                        <%--</fieldset>--%>
                    </div>

                    <footer class="InnerFooter">
                        <a class="btn btn-primary AddOwner" href="#">Save</></a>

                        <a class="btn CancelOwner">Cancel</a>

                    </footer>
                </div>

                <%--Grid Owners--%>
                <div class="box span6">
                    <div class="box-header">
                        <h2>Current Owners</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%--  <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>
                    <div class="box-content" style="height: 492px; overflow: auto;">
                        <table class="table table-condensed" id="OwnerTable">
                            <thead>
                                <tr>
                                    <th>Owner Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
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
                <%--  Grid Owners--%>
            </div>
        </div>

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

                <div class="box span6">
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
                    <div class="box-content" style="height: 305px; overflow: auto;">
                        <table class="table table-condensed" id="DesignerTable">
                            <thead>
                                <tr>
                                    <th style="width: 85px;">Name</th>
                                    <th style="width: 102px;">Mobile</th>
                                    <th style="width: 110px;">Profile</th>
                                    <th style="width: 85px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
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
                <div class="box span6">
                    <div class="box-header">
                        <h2>New User</h2>
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
                    <div class="box-content" style="height: 490px; overflow: auto;">
                        <table class="table table-condensed" id="UsersTable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th style="width: 105px;">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
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
    <input type="hidden" id="hdfOwnerID" value="" />
    <input type="hidden" id="hdfCardNo" value="" />
    <input type="hidden" id="hdfDesignerID" value="" />

</asp:Content>
