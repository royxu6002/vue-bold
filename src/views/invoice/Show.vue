<template>
  <div class="invoice_create container">
    <div class="invoice-title" align="center">
      <h2>PROFORMA INVOICE</h2>
    </div>
    <span>Invoice Data</span>
    {{invoiceData}}
    <div>Package Data</div>
    {{packagesData}}
    <div class="row invoice-header">
      <div class="invoice-header-left">
        <small>BILL TO</small>
        <h6 class="mt-2">{{invoiceData.client.company}}</h6>
        <div>{{invoiceData.client.address}}</div>
        <div>{{invoiceData.client.tel}}</div>
        <div>{{invoiceData.client.email}}</div>
      </div>
      <div class="invoice-header-right">
        <small>BILL FROM</small>
        <h6 class="mt-2">Comlibra Electronic CO., Ltd</h6>
        <div class="align-right">Room 423, Baolong Sqaure, Xiaoshan, Hangzhou, China</div>
        <div>+86 18258194466</div>
        <div>18258194466@qq.com</div>
      </div>
    </div>
    <hr>
    <div class="row invoice-brief">
        <div class="left">
          <small>Invoice #: {{invoiceData.id}}</small>
          <div>Date issued: {{invoiceData.issued_date}}</div>
          <div>Due Date: {{invoiceData.due_date}}</div>
        </div>
        <div class="right">
          <small>Invoice Total
          </small>
          <div class="invoice-value">${{invoiceData.total}}</div>
        </div>      
    </div>
    <div class="row invoice-table">
      <div class="mt-3">
        <small>The aforementioned parties hereby agree and conclude a deal as below:</small>
      </div>
      <table
        valign="top"
        cellspacing="10px 0"
        cellpadding="10px 0"
        width="100%"
        style="border-collapse:collapse"
      >
        <tr style="border-bottom: 1px solid #171218">

          <th>
            ART.NO. & DESCRIPTION
          </th>
          <th>HS CODE</th>
          <th>COST</th>
          <th>QTY</th>
          <th class="th-right">PRICE</th>
        </tr>
        <tr 
          style="border-bottom: 1px solid #ccc" 
          v-for="(product, index) in invoiceData.products" 
          :key="index">
          <td>
            <b>{{product.product_name}}</b> 
            {{product.product_description}}
          </td>
          <td >842310 0000</td>
          <td >US${{product.order_info.product_cost}}</td>
          <td >{{product.order_info.product_quantity}}</td>
          <td align="right">US${{product.order_info.product_cost * product.order_info.product_quantity}}</td>
        </tr>

        <tr style="font-weight: 500">
          <td colspan="2" rowspan="5"></td>
          <td colspan="2" align="left">Subtotal</td>
          <td align="right">US$4,309.20</td>
        </tr>
        <!-- <tr align=center>
                  <td colspan="6" align="right" style="font-weight:bold;"> Pallets Cost</td>
                  <td style="font-weight:bold;">US$15.00</td>
              </tr> -->

        <tr style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc">
          <td colspan="2" align="left">
            TNT Shipping Cost
          </td>
          <td align="right">US${{invoiceData.shipment_cost}}</td>
        </tr>
         <tr style="font-weight: 500;border-bottom: 1px solid #ccc;border-top:1px solid #ccc">
          <td colspan="2" align="left">
          Discount
          </td>
          <td align="right">US${{invoiceData.discount}}</td>
        </tr>
        <tr style="font-weight: 500;border-bottom: 1px solid #ccc">
          <td colspan="2" align="left">
            Invoice Total
          </td>
          <td align="right">US$5,000.00</td>
        </tr>
        <tr style="font-weight: 500;border-bottom: 1px solid #ccc">
          <td colspan="2" align="left">Paid to date</td>
          <td align="right">US$1,300.00</td>
        </tr>

        <tr style="font-weight:500;font-size: 1.1em">
          <td colspan="2" align="left">BALANCE</td>
          <td align="right">US$3,954.20</td>
        </tr>
      </table>
    </div>
    <div class="invoice-terms">
      <table align="center" cellpadding="10px">
        <tr>
          <td valign="top" style="font-weight:bold;">TERMS OF PACKING:</td>
          <td colspan="3" valign="top">
            ART. CK750 TO BE PACKED IN CARTONS OF 56PCS EACH ONLY, SUBTOTAL 27 CARTONS.
            <br>SHIPPING MARK: SKD parts & components for CK750
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">TERMS OF SHIPMENT:</td>
          <td colspan="3" valign="top">
            FROM: HANGZHOU OR SHENZHEN, CHINA<br />
            TO: ITALY<br />
            TO BE EFFECTED BEFORE AUGUST 20TH, 2019 <br />WITH PARTIAL SHIPMENTS
            NOT ALLOWED
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">DOCUMENTS:</td>
          <td colspan="3" valign="top">
            DIGITAL COMMERCIAL INVOICE AND PACKING LIST ORIGINAL BILL OF LADING OR
            TELEX-RELEASED B/L COPIES
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">TERMS OF PAYMENT:</td>
          <td colspan="3" valign="top">
            PRICE TERMS: EXW HANGZHOU(or SHENZHEN), CHINA<br />
            T/T 30% or 100% In Advance. <br />
            Please kindly remit the payment to following beneficiary's BANK:<br /><br />
            <b
              >BENEFICIARY NAME: COMLIBRA ELECTRONIC CO., LTD..<br />
              A/C NO. FOR USD: NRA1 5623 1420 1050 0000 153<br />
              <!-- A/C NO. FOR EUR: NRA1 5623 3820 1050 0000 046<br> -->
              BENEFICIARY BANK: ZHEJIANG CHOUZHOU COMMERCIAL BANK ADDRESS:
              YIWULEYUAN EAST, JIANGBIN RD, YIWU, ZHEJIANG, CHINA SWIFT BIC:
              CZCBCN2X<br />
              CORRESPONDENT BANK: BANK OF AMERICA N.A.NEW YORK BRANCH <br />
              SWIFT BIC: BOFAUS3N</b>
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">TERMS OF INSURANCE:</td>
          <td colspan="3" valign="top">
            FOR TRANSACTIONS CONCLUDED ON C.I.F. BASIS, IT IS UNDERSTOOD THAT THE
            INSURANCE AMOUND WILL BE FOR 110% OF THE INVOICE VALUE AGAINST THE
            RISKS SPECIFIED IN THE INVOICE. IF ADDITIONAL INSURANCE OR COVERAGE
            REQUIRED, THE BUYER MUST HAVE THE CONSENT OF THE SELLER BEFORE
            SHIPMENT. AND THE ADDITIONAL PREMIUM IS TO BE BORND BY THE BUYER.
          </td>
        </tr>

        <tr>
          <td colspan="4">Hereby confirmed by:</td>
        </tr>
        <tr align="center">
          <td
            colspan="2"
            style="font-weight:bold; background-image:url('./upload/stamp.png');background-size:contain;background-repeat:no-repeat;background-position:center;"
          >
            THE SELLER:<br />
            ROY XU<br /><br />
            COMLIBRA ELECTRONIC CO., LTD.<br />Signature & Stamp
          </td>
          <td
            colspan="2"
            style="font-weight:bold; background-image:url('');background-size:contain;background-repeat:no-repeat;background-position:center;"
          >
            THE BUYER:<br />
            <br /><br />
            <br />Signature & Stamp
          </td>
        </tr>

        <tr align="center">
          <td colspan="2"></td>
          <td colspan="2"></td>
        </tr>

        <tr>
          <td width="25%"></td>
          <td width="25%"></td>
          <td width="25%"></td>
          <td width="25%"></td>
        </tr>
        <tr>
          <td width="25%"></td>
          <td width="25%"></td>
          <td width="25%"></td>
          <td width="25%"></td>
        </tr>
        <tr>
          <td colspan="4" style="font-weight:bold;">REMARKS</td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">&nbsp;&nbsp;Claims:</td>
          <td colspan="3" valign="top">
            In case of any discrepancy in quality, claims should be filed by the
            Buyer within 30 days after the arrival of the goods at port of
            destination; while for quantity discrepancy, claims should be filed by
            the buyer within 15 days after the arrival of the goods at port of
            destination.
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">
            &nbsp;&nbsp;Force Majeure:
          </td>
          <td colspan="3" valign="top">
            The seller shall not hold riable to non-delivery or delay in the
            delivery of the entire lot or a portion of the goods hereunder by
            reason of natural disasters, war or other causes of Force Majeure.
            However, the Seller shall notify the Buyer as soon as possible and
            furnish the Buyer within 15 days by registered airmail with a
            certificate issued by the China Council of the Promotion of
            International Trade attesting such event(s).
          </td>
        </tr>
        <tr>
          <td valign="top" style="font-weight:bold;">&nbsp;&nbsp;Arbitration:</td>
          <td colspan="3" valign="top">
            All deputes arising out of the performance of, or relating to this
            Invoice, shall be settled through negotiation. In case of no
            settlement can be reached through negotiation, the case shall then be
            submitted to the China International Economic and Trade Arbitration
            Commission for arbitration in accordance with its arbitral rules. The
            arbitration shall take place in China. The arbitral award is final and
            binding upon both partes.
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "InvoiceCreate",
  data() {
    return {
      invoiceData: {},
      packagesData: {}
    };
  },
  methods: {
    getInvoiceData() {
      axios
        .get(this.GLOBAL.baseUrl + "/invoice/" + this.$route.params.id)
        .then(res => {
          this.invoiceData = res.data;
        })
        .catch(err => {
          alert(err);
        })
    },
    getPackagesData(id) {
      axios
        .get(this.GLOBAL.baseUrl + "/packages/" + id)
        .then(res => {
          this.packagesData = res.data;
        })
        .catch(err => {
          alert(err);
        })
    }
  },
  created() {
    this.getInvoiceData();
    this.getPackagesData();
  }
};
</script>
<style>
th,td{
  /* margin: 0; */
  padding: 10px 0;
}
.th-right{
  text-align: right !important;
}
.invoice-header {
  display: flex;
  justify-content: space-between;
}
.invoice-header-right {
  text-align: right;
}
.invoice-brief {
  display: flex;
  justify-content: space-between;
}
.invoice-value {
  font-size: 20px;
  font-weight: bold;
}
.invoice-table-tr-top{
  border-top: 1px solid #ccc
}
</style>
