<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Profile.aspx.cs" Inherits="Boutique.AdminPanel.Profile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="../CSS/CustomCSS/Profile.css" rel="stylesheet" />
    <link href="../CSS/Common.css" rel="stylesheet" />
    <script src="../Scripts/CommonJS/Common.js"></script>
    <script src="../Scripts/UserJS/Profile.js"></script>

    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="DashBoard.aspx">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">Boutique Profile</a></li>
        </ul>

        <div class="row-fluid"><span class="headerStyle">Boutique Profile</span></div>
        <div class="row-fluid" style="height: 3px;"></div>

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

        <div class="row-fluid sortable">
            <div class="box span12" style="width: 90%">

                <div class="box-header">
                </div>

                 <div class="box-content">

                     <ul class="nav tab-menu nav-tabs" id="myTab">
                        <li class="icon active"><a href="#Profiles"><i class="icon-copy"></i>Profiles</a></li>
                        <li><a href="#Banners"><i class="icon-paste"></i>Banners</a></li>

                    </ul>

                         <div id="myTabContent" class="tab-content">

                              <div class="tab-pane active" id="Profiles">


                                   <div class="row-fluid">

            <div class="box span12">
                <div class="box-header">
                    <h2>Customize your Boutique</h2>
                    <div class="box-icon">
                        <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                    </div>
                </div>
                <div class="box-content" style="height: 650px; overflow: auto;">
                    <div class="form-horizontal">
                        <%--<fieldset>--%>
                        <div class="span6">

                            <div class="control-group">

                                <label class="control-label" for="focusedInput">App Version</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtAppVersion" type="text" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Name</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtBouquetName" type="text" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Started Year</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtStartYear" type="text" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">About us</label>
                                <div class="controls">
                                    <textarea class="form-control" style="max-width: 75%" rows="5" id="txtAboutus"></textarea>
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Caption</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtCaption" type="text" />
                                </div>
                            </div>


                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Location</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtLocation" type="text" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Address</label>
                                <div class="controls">
                                    <textarea class="form-control" style="max-width: 75%" rows="4" id="txtAddress"></textarea>
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Timings</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtTimings" type="text" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Working Days</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtWorkingDays" type="text" />
                                </div>
                            </div>

                        </div>

                        <div class="span6">

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Phone</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtPhone" type="text" onkeypress="return isNumber(event)" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Facebook Link</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtFacebooklink" type="text" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Instagram Link</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtInstatgramlink" type="text" />
                                </div>
                            </div>
                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Latitude</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtLatitude" type="text" />
                                </div>
                            </div>
                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Longitude</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtLongitude" type="text" />
                                </div>
                            </div>
                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Image</label>
                                <div class="controls">
                                    <input id="imageUpload" type="file" size="60" name="myfile" />
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls">
                                    <output id="imageList" class="listClass"></output>
                                </div>
                            </div>
                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Logo</label>
                                <div class="controls">
                                    <input id="logoUpload" type="file" size="60" name="myfile" />
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="controls">
                                    <output id="logoList" class="listClass"></output>
                                </div>
                            </div>

                        </div>


                    </div>


                    <%--</fieldset>--%>
                </div>
                <footer id="footer" runat="server" class="InnerFooter">
                    <a class="btn btn-primary AddBoutique" href="#">Save</></a>
                    <a class="btn CancelClear">Cancel</a>
                </footer>
            </div>
        </div>

        <div class="row-fluid" style="height: 10px"></div>

        <div class="row-fluid">

            <div class="box-header">
                <h2>Owner</h2>
                <div class="box-icon">
                    <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                    <%-- <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                    <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                </div>
            </div>
            <div class="box-content">


                <div id="NewOwner" runat="server" class="box span6">
                    <div class="box-header">
                        <h2 id="editLabel">New Owner</h2>
                        <div class="box-icon">
                            <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>--%>
                            <%-- <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                            <%--<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                        </div>
                    </div>
                    <div class="box-content" style="height: 438px; overflow: auto;">
                        <div class="form-horizontal">
                            <div class="alert alert-error" id="ErrorBox" style="display: none;">
                                <div id="Displaydiv">
                                </div>
                            </div>
                            <%--<fieldset>--%>
                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Name</label>
                                <div class="controls">
                                    <input class="input-large focused" name="Owner Name" id="txtOwnerName" type="text" />
                                </div>
                            </div>


                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Address</label>
                                <div class="controls">
                                    <textarea class="form-control" style="max-width: 68%" rows="4" name="Address" id="txtOwnerAddress"></textarea>
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Phone</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtOwnerPhone" name="Mobile Number" type="text" onkeypress="return isNumber(event)" />
                                </div>
                            </div>

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Email</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtOwnerEmail" name="Email" type="text" />
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
                        <a class="btn btn-primary AddOwner" onclick="OwnerValidate()" href="#">Save</></a>

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
                    <div class="box-content TableLayout" style="height: 492px; overflow: auto;">
                        <table class="table table-striped table-bordered  bootstrap-datatable" id="OwnerTable">
                            <thead id="Ownerthead">
                                <tr>
                                    <th>Owner Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="ownerrows">
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


                              </div>

                                <div class="tab-pane" id="Banners"></div>

                         </div>



                 </div>


            </div>


        </div>



    </div>
    <input type="hidden" id="hdfBoutiqueID" value="" />
    <input type="hidden" id="hdfRole" value="" />
    <input type="hidden" id="hdfOwnerID" value="" />
    <input type="hidden" id="hdfUserID" value="" />

</asp:Content>
