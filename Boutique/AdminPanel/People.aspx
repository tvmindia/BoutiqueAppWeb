<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="People.aspx.cs" Inherits="Boutique.AdminPanel.People" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <link href="../CSS/CustomCSS/People.css" rel="stylesheet" />

     <div id="content" class="span10">

           <div class="row-fluid">

                <div class="box span6">
					<div class="box-header">
						<h2>Create New User</h2>
						<div class="box-icon">
							<%--<a href="#" class="btn-setting"><i class="halflings-icon wrench"></i></a>
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>--%>
						</div>
					</div>
					<div class="box-content"  style="height:488px;overflow:auto;" >
						<div class="form-horizontal">
							<%--<fieldset>--%>
							  <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" id="txtName" type="text"/>
								</div>
								</div>
							
							  <div class="control-group">
								 <label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" id="txtMobile" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								<label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused" id="txtEmail" type="text"/>
								</div>
								</div>

                              <div class="control-group">
								<label class="control-label">Is Acitive?</label>
								<div class="controls">
								  <label class="checkbox inline">
									<input type="checkbox" id="chkActive" value="option1"/>Yes</label>
								</div>
							  </div>

                            <div class="control-group">
							  <label class="control-label" for="date01">DOB</label>
							  <div class="controls">
								<input type="text" class="input-large datepicker" id="dateDOB" value="02/16/12"/>
							  </div>
							</div>

                               <div class="control-group">
							  <label class="control-label" for="date01">Anniversary</label>
							  <div class="controls">
								<input type="text" class="input-large datepicker" id="dateAnniversary" value="02/16/12"/>
							  </div>
							</div>

                             <div class="control-group">
								 <label class="control-label" for="focusedInput">Loyalty Card No</label>
								<div class="controls">
								  <input class="input-large focused" id="txtloycardno" type="text"/>
								</div>
								</div>

							  </div>
						
							  <div class="form-actions">
								<button type="submit" class="btn btn-primary">Save changes</button>
								<button class="btn">Cancel</button>
							  </div>
							<%--</fieldset>--%>
						</div>
                    </div>
           </div>

     </div>





</asp:Content>
