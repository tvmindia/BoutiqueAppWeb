<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="OrderStatus.aspx.cs" Inherits="Boutique.AdminPanel.OrderStatus" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/UserJS/OrderStatus.js"></script>
    <link href="../CSS/CustomCSS/OrderStatus.css" rel="stylesheet" />
    <link href="../CSS/select2.min.css" rel="stylesheet" />
    <script src="../Scripts/select2.min.js"></script>
   

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="DashBoard.aspx">Home</a>
                <i class="icon-angle-right"></i>
            </li>
            <li><a href="#">Order Status</a></li>
        </ul>

        <div class="row-fluid"><span class="headerStyle">Order Status</span></div>
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

        <%--//END   Alert boxes --%>

        <div class="row-fluid sortable" id="Orders">
            <div class="box span12">
                <div class="box-header">
                    <h2>Current Orders</h2>
                    <div class="box-icon">
                    </div>
                </div>
                <div class="box-content TableLayout">

                    <table class="table table-striped table-bordered  bootstrap-datatable" id="OrdersTable">
                        <thead>
                            <tr>
                                <th>OrderNo</th>
                                <th>OrderDescription</th>
                                <%-- <th>OrderDate</th>
                                <th>Expected Delivery Date</th>--%>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="OrderRows">
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

        <div id="NewOrder" runat="server" class="row-fluid">
            <div class="box span12">
                <div class="box-header">
                    <h2 id="editLabel">New Order</h2>
                    <div class="box-icon">
                    </div>
                </div>

                <div class="box-content " style="height: 100%; overflow: auto;">

                       <div class="span12" >

                    <div 
                        class="form-horizontal">

                        <%--FIRST HALF--%>

                        <div class="span6">

                            <div class="control-group" id="OrderNoDiv" style="display: none;">

                                <label class="control-label" for="focusedInput">OrderNo</label>
                                <div class="controls">
                                    <label class="control-label" id="lblOrderNo" style="display: none;" />

                                </div>
                            </div>

                            
                          <%--  <div class="control-group">
								<label class="control-label" for="selectError3">Boutiques</label>
								<div class="controls">
								   <select class="ddlboutiques" id="idDdlboutiques">
                                     <option></option>
                                   </select>
								</div>
							  </div>--%>


                               <div class="control-group">
								<label class="control-label" for="Users">User</label>
								<div class="controls">
								  <select class="Users" >
                                      <option></option>
								  </select>
								</div>
							  </div>
                   

                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Order Description</label>
                                <div class="controls">
                                    <textarea class="form-control" style="max-width: 68%" rows="4" id="txtDescription"></textarea>
                                </div>
                            </div>
                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Order Date</label>
                                <div class="controls">
                                    <input type="text" readonly="readonly" style="cursor: default; background-color: white" class="input-large datepicker" id="txtOrderDate" value="" />

                                    <label class="control-label" id="dateOrderDate" style="display: none;" />

                                </div>
                            </div>

                            <div class="control-group">

                                <label class="control-label" for="focusedInput">Planned Delivery Date</label>
                                <div class="controls">
                                    <input type="text" readonly="readonly" style="cursor: default; background-color: white" class="input-large datepicker" id="txtPlannedDeliveryDate" value="" />

                                    <label class="control-label" id="datePlannedDeliveryDate" style="display: none;" />

                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="date01">Total Order Amount</label>
                                <div class="controls">
                                    <input class="input-large focused" id="txtTotalOrderAmount" type="number" min="0" />
                                </div>
                            </div>
                        </div>

                        <%-- END FIRST HALF--%>

                        <%--SECOND HALF--%>

                        <div class="span6">
                            <div class="control-group" id="ForecastDiv" >
                                <label class="control-label" for="date01">Forecast Delivery Date</label>
                                <div class="controls">
                                    <input type="text" readonly="readonly" disabled="disabled" style="cursor: default; background-color: white;" class="input-large datepicker"  id="dateForecastDeliveryDate" value="" />
                                </div>
                            </div>

                            <div class="control-group" id="OrderReadyDiv" >
                                <label class="control-label" for="date01">Order Ready Date</label>
                                <div class="controls">
                                    <input type="text" readonly="readonly" disabled="disabled" style="cursor: default; background-color: white;" class="input-large datepicker" id="dateOrderReadyDate" value="" />
                                </div>
                            </div>

                            <div class="control-group" id="ActualDeliveryDiv" >
                                <label class="control-label" for="date01">Actual Delivery Date</label>
                                <div class="controls">
                                    <input type="text" readonly="readonly" disabled="disabled" style="cursor: default; background-color: white;" class="input-large datepicker" id="dateActualDeliveryDate" value="" />
                                </div>
                            </div>

                        </div>

                        <%--END SECOND HALF--%>
                    </div>

                 </div>

                 

                      <div class="span12" style="border-top:ridge;width:90%">
                          </div>
                           <%--<h2 id="NewItem" style="text-align:center">New Item</h2>--%>   
                     
                
                     <div class="span12">

                         <div class="span3">

                            <div class="control-group">
								<label class="control-label" for="products">Product</label>
								<div class="controls">
								  <select class="products" >
                                      <option></option>
								  </select>
								</div>
							  </div>
                         </div>

                         <div class="span6">

                             <div class="control-group">
								<label class="control-label" for="Remarks">Remarks</label>
								<div class="controls">
								   <textarea class="form-control"  style="width:477px" rows="1" id="txtRemarks"></textarea>
                                      
								</div>
							  </div>

                         </div>

                         <div class="span3">

                             <div style="height:32px"></div>

                             <div class="control-group">
                                   <a class="addToList">Add To List</a>
                              </div>

                         </div>

                          </div>
                       

                    <div class="span12">

                         <div class="span3">

                               <img  id="ImgProduct" width="30%" height="30%"/>
                             </div>

                        <div class="span6">

                        <%--<div class="box-content TableLayout">--%>

                             <table class="table table-striped table-bordered  bootstrap-datatable" id="OrderItemTable">
                       
                               <thead>
                                            <tr>
                                  <th class="fullRow">Product</th>
                                    <th class="fullRow">Description</th>
                                                </tr>
                                           </thead>

                                <tbody id="OrderItemRows">
                                    
                                        
                                    
                                </tbody>
                            </table>


                <%--</div>--%>

                        </div>

                    </div>


                      </div>


                <footer class="InnerFooter">
                    <a class="btn btn-primary submitDetails" href="#">Save</></a>
                    <a class="btn Cancel">Cancel</a>
                </footer>
               
            </div>
        

            
          
        </div>


        <%--<div id="Div1" runat="server" class="row-fluid">

            

            <div class="box span12">
                <div class="box-header">
                    <h2 id="editLabel1">Items</h2>
                    <div class="box-icon">
                    </div>
                </div>

                <div class="box-content " style="height: 10%; overflow: auto;">
                    <div class="form-horizontal">

                      

                        
                            
                       

                    </div>

                </div>

                <footer class="InnerFooter">
                    <a class="btn btn-primary AddItem" href="#">Save</></a>
                    <a class="btn CancelItem">Cancel</a>
                </footer>
            </div>
           
        </div>--%>

        <%--<div class="row-fluid box" id="OrderItem">
            <div class=" span12">
                <div class="box-header">
                    <h2>Items</h2>
                    <div class="box-icon">
                    </div>
                </div>
                <div class="box-content TableLayout">

                    <table class="table table-striped table-bordered  bootstrap-datatable" id="OrderItemTable">
                       
                        <tbody id="OrderItemRows">
                        </tbody>
                    </table>


                </div>
                <div class="form-horizontal">

                    <div class="span6">

                 <div class="control-group">
								<label class="control-label" for="products">Product</label>
								<div class="controls">
								  <select class="products" >
                                      <option></option>
								  </select>
								</div>
							  </div>
                    </div>
                     <div class="span6">

                    <div class="control-group">
								<label class="control-label" for="Remarks">Remarks</label>
								<div class="controls">
								   <textarea class="form-control" style="max-width: 68%" rows="4" id="txtRemarks"></textarea>
                                      
								</div>
							  </div>
                         </div>
                    </div>

                     <footer class="InnerFooter">
                     <a class="btn btn-primary AddOrderItem" href="#">Save</></a>
							
                          <a class="btn CancelOrderItem">Cancel</a>
                    <a >Cancel</a>
                </footer>
            </div>
           
        </div>--%>


        

    </div>

    <input type="hidden" id="hdfOrderID" />  
      
</asp:Content>
