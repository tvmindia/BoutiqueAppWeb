<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="OrderStatus.aspx.cs" Inherits="Boutique.AdminPanel.OrderStatus" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/UserJS/OrderStatus.js"></script>
    <link href="../CSS/CustomCSS/OrderStatus.css" rel="stylesheet" />
  
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
          <div class="row-fluid" style="height:3px;"></div>

        <%--Alert boxes --%>
         <div class="row-fluid" id="rowfluidDiv" style="display:none;">	
				<div class="box span12">

                    <div class="box-content alerts">
						<div class="alert alert-error" style="display:none;">
						
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						
							<strong>Successfull.</strong> 
						</div>						
					</div>

                </div>
            </div>
		
	     <%--//END   Alert boxes --%>

        <div class="row-fluid sortable" id="Orders">
            <div class="box span12">
                <div class="box-header">
                    <h2>Orders</h2>
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
                        <tbody id="userrows">
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
      
             <div id="NewOrder" runat="server" class="row-fluid">

                  <div class="box span6">

                  
                  <div class="box-header">
						<h2 id="editLabel">New Order</h2>
						<div class="box-icon">
							
						</div>
					</div>
					<div class="box-content"  style="height:503px;overflow:auto;" >
						<div class="form-horizontal">

							<%--<fieldset>--%>
							<div class="control-group">

                                  

							
								  <label class="control-label" for="focusedInput">OrderNo</label>
								<div class="controls">
								  <input class="input-large focused" id="txtOrderNo" type="text"/>
								</div>
								</div>

							<div class="control-group">
								 <label class="control-label" for="focusedInput">Order Description</label>
								<div class="controls">
								  <textarea class="form-control" style="max-width:68%" rows="4" id="txtDescription"></textarea>
								</div>
								</div>

                            <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Order Date</label>
								<div class="controls">
								   <label class="control-label" id="dateOrderDate" />
								</div>
								</div>

                            <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Planned Delivery Date</label>
								<div class="controls">
                                    <label class="control-label" id="datePlannedDeliveryDate" />
								  
								</div>
								</div>

                            <div class="control-group">
							  <label class="control-label" for="date01">Forecast Delivery Date</label>
							  <div class="controls">
								<input type="text" readonly="readonly" style="cursor:default; background-color:white"  class="input-large datepicker" id="dateForecastDeliveryDate" value=""/>
							  </div>
							</div>

                            <div class="control-group">
							  <label class="control-label" for="date01">Order Ready Date</label>
							  <div class="controls">
								<input type="text" readonly="readonly" style="cursor:default; background-color:white" class="input-large datepicker" id="dateOrderReadyDate" value=""/>
							  </div>
							</div>
						
                            <div class="control-group">
							  <label class="control-label" for="date01">Actual Delivery Date</label>
							  <div class="controls">
								<input type="text" readonly="readonly" style="cursor:default; background-color:white" class="input-large datepicker" id="dateActualDeliveryDate" value=""/>
							  </div>
							</div>
                           
                            <div class="control-group">
							  <label class="control-label" for="date01">Total Order Amount</label>
							  <div class="controls">
								<input class="input-large focused" id="txtTotalOrderAmount" type="number" min="0" />
							  </div>
							</div>


					 </div>
						
					        
						
						</div>

                        <footer class="InnerFooter">
                       
                            <a class="btn btn-primary submitDetails" href="#">Save</></a>
							
                           <a class="btn Cancel">Cancel</a>
                         </footer>

              </div>

          </div>

    </div>

</asp:Content>
