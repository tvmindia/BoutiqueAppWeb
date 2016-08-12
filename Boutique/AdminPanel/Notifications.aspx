<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notifications.aspx.cs" Inherits="Boutique.AdminPanel.Notifications" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <link href="../CSS/CustomCSS/Notifications.css" rel="stylesheet" />
    <link href="../CSS/Common.css" rel="stylesheet" />
      <script src="../Scripts/custom.js"></script>
        <script src="../Scripts/jquery.dataTables.min.js"></script>
    <script src="../Scripts/CommonJS/Common.js"></script>
   
    <link href="../CSS/select2.min.css" rel="stylesheet" />
    <script src="../Scripts/select2.min.js"></script>
     <script src="../Scripts/UserJS/Notification.js"></script>
    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="index.html">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">Notifications</a></li>
        </ul>
        <div class="row-fluid"><span class="headerStyle">Notifications</span></div>
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
                        <li><a href="#Notifications">Notifications</a></li>
                        <li><a href="#PersonlizedNotification">Personalised Notifications</a></li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <%--  Notification grid--%>
                        <div class="tab-pane active" id="Notifications">
                            <div class="row-fluid ">
                                <div class="box span12">
                                    <div class="box-header">
                                        <h2>Current Notifications</h2>
                                        <div class="box-icon">
                                        </div>
                                    </div>
                                    <div class="box-content " style="min-height: 500px;">

                                        <table class="table table-striped table-bordered  bootstrap-datatable" id="NotificationTable">
                                            <thead id="notificationthead">
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody id="notificationrows">
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                <!--/span-->
                                <div id="NewNotification" runat="server" class="row-fluid">

                                    <div class="box span6">


                                        <div class="box-header">
                                            <h2 id="editLabel">New Notification</h2>
                                            <div class="box-icon">
                                                <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                                            </div>
                                        </div>
                                        <div class="box-content" style="height: 503px; overflow: auto;">
                                            <div class="form-horizontal">
                                                <div class="alert alert-block" id="ErrorBox" style="display: none;">
                                                    <div id="Displaydiv">
                                                    </div>
                                                </div>
                                                <%--<fieldset>--%>
                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Title</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Title" id="txtTitle" type="text" />
                                                    </div>
                                                </div>
                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Description</label>
                                                    <div class="controls">
                                                        <textarea class="form-control" style="max-width: 68%" rows="4" name="Description" id="txtDescription"></textarea>
                                                    </div>
                                                </div>



                                                <div class="control-group">
                                                    <label class="control-label" for="date01">Start Date</label>
                                                    <div class="controls">
                                                        <input type="text" readonly="readonly" style="cursor: default; background-color: white" class="input-large datepicker" name="Start Date" id="dateStartDate" value="" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="date01">End Date</label>
                                                    <div class="controls">
                                                        <input type="text" readonly="readonly" style="cursor: default; background-color: white" class="input-large datepicker" name="End Date" id="dateEndDate" value="" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="products">Product</label>
                                                    <div class="controls">
                                                        <select class="products">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div class="control-group">
                                                    <label class="control-label" for="categories">Category</label>
                                                    <div class="controls">
                                                        <select class="categories">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>


                                            </div>



                                        </div>

                                        <footer class="InnerFooter">
                                            <%-- <button type="submit" class="btn btn-primary submitDetails">Save</button>
				    	 <button class="btn">Cancel</button>--%>
                                            <a class="btn btn-primary submitDetails" onclick="return NotificationValidation()" href="#">Save</></a>

                                            <a class="btn Cancel">Clear</a>
                                        </footer>

                                    </div>

                                </div>
                            </div>
                            <!--/row-->
                        </div>
                        <div class="tab-pane" id="PersonlizedNotification">



                            <div class="box span12">
                                <div class="box-header">
                                    <h2>Personlised Notification</h2>
                                    <div class="box-icon">
                                    </div>
                                </div>
                                <div class="box-content" style="min-height: 500px;">

                                    <table class="table table-striped table-bordered  bootstrap-datatable" id="PersonalisedNotificationTable">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Contact Number</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Actions</th>

                                            </tr>
                                        </thead>
                                        <tbody id="PersonalisedNotificationrows">
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div id="PersonalisedNewNotification" runat="server" class="row-fluid">

                                    <div class="box span6">


                                        <div class="box-header">
                                            <h2 id="PersonalisededitLabel">New Notification</h2>
                                            <div class="box-icon">
                                                <%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
                                            </div>
                                        </div>
                                        <div class="box-content" style="height: 503px; overflow: auto;">
                                            <div class="form-horizontal">
                                                <div class="alert alert-block" id="PersonalisedErrorBox" style="display: none;background-color: #fdeaea !important;color: #ca6f74 !important;border: 1px solid #f27b81 !important;">
                                                    <div id="PersonalisedDisplaydiv">
                                                    </div>
                                                </div>
                                                <%--<fieldset>--%>

                                                <div class="control-group">
                                                        <label class="control-label" for="Users">User</label>
                                                        <div class="controls">
                                                            <select class="Users">
                                                                <option></option>
                                                            </select>
                                                        </div>
                                                    </div>



                                                <div class="control-group">

                                                    <label class="control-label" for="focusedInput">Title</label>
                                                    <div class="controls">
                                                        <input class="input-large focused" name="Title" id="PersonalisedtxtTitle" type="text" />
                                                    </div>
                                                </div>
                                                <div class="control-group">
                                                    <label class="control-label" for="focusedInput">Description</label>
                                                    <div class="controls">
                                                        <textarea class="form-control" style="max-width: 68%" rows="4" name="Description" id="PersonalisedtxtDescription"></textarea>
                                                    </div>
                                                </div>



                                                <div class="control-group">
                                                    <label class="control-label" for="date01">Start Date</label>
                                                    <div class="controls">
                                                        <input type="text" readonly="readonly" style="cursor: default; background-color: white" class="input-large datepicker" name="Start Date" id="PersonaliseddateStartDate" value="" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="date01">End Date</label>
                                                    <div class="controls">
                                                        <input type="text" readonly="readonly" style="cursor: default; background-color: white" class="input-large datepicker" name="End Date" id="PersonaliseddateEndDate" value="" />
                                                    </div>
                                                </div>

                                                <div class="control-group">
                                                    <label class="control-label" for="products">Product</label>
                                                    <div class="controls">
                                                        <select class="products" id="ddlProducts">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div class="control-group">
                                                    <label class="control-label" for="categories">Category</label>
                                                    <div class="controls">
                                                        <select class="categories" id="ddlCategories">
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>


                                            </div>



                                        </div>

                                        <footer class="InnerFooter">
                                            <%-- <button type="submit" class="btn btn-primary submitDetails">Save</button>
				    	 <button class="btn">Cancel</button>--%>
                                            <a class="btn btn-primary PersonalisedsubmitDetails" onclick="return PersoanlisedNotificationValidation()"  href="#">Save</></a>

                                            <a class="btn PersonalisedCancel">Cancel</a>
                                        </footer>

                                    </div>

                                </div>
                        </div>

                        <%--  Notification grid--%>
                    </div>
                </div>
            </div>
            <!--/span-->
        </div>
        <%--Tab Content--%>
    </div>
    <input type="hidden" id="hdfNotificationID" value="" />
     <input type="hidden" id="hdfNotificationID1" value="" />
    <input type="hidden" id="hdfRole" value="" />
</asp:Content>
