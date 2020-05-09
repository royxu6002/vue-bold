<template>
  <div class="price-system-page row mt-3" style="padding: 0 15px;">
    <div style="font-size: 20px; text-align: center; color: blue; display: flex; justify-content: space-between;">
        <small class="mr-3">汇率 USDRMB: {{priceSystem.currencyRate}}</small>
        <small class="mr-3">增值税 VAT: {{VAT.COMMODITY}}</small>
        <small>报价: {{FOBCOST}}</small>
    </div>
    <hr />
    <div class="price-product-info">
      <div style="border-top: 1px solid #ccc;">
        <!-- 基本产品信息模块 -->
        <div
          style="display: flex; justify-content: space-around; flex-direction: column;"
        >
          <div>
            <small>预期利润率: </small>
            <input type="text" v-model="priceSystem.profitRate">
          </div>

          <div>
            <small>本月汇率: </small>
            <input type="text" v-model="priceSystem.currencyRate">
          </div>
          <div>
            <small>选择产品:</small>
            <select v-model="productInfo.productId" @blur="settleRefundRate">
              <option
                v-for="(pro, index) in productsData"
                :key="index"
                :value="pro.id"
              >
                {{ pro.name }}
              </option>
            </select>
          </div>

          <div>
            <small>产品退税率:</small>
            <input type="text" v-model="productInfo.refundRate">
          </div>

          <!-- {{filterById()}} -->

          <div v-if="filterById()[0]">
            <small>供应商:</small>
            <select
              v-if="filterById()[0].suppliers.length > 0"
              @blur="settlePrice()"
              v-model="productInfo.supplierId"
            >
              <option
                v-for="(su, index) in filterById()[0].suppliers"
                :key="index"
                :value="su.id"
              >
                {{ su.name }}
              </option>
            </select>
          </div>
          
          <div>
            <small>工厂税点: </small>
            <span>
              <input type="text" v-model="productInfo.factoryTaxRate" />
              %
            </span>
          </div>

          <div>
            <small>价格条款: </small>
            <select v-model="productInfo.priceTerm">
              <option value="exw_no_tax">出厂不含税</option>
              <option value="exw_tax">出厂含税</option>
              <option value="cpt_no_tax">进仓不含税</option>
              <option value="cpt_tax">进仓含税</option>
              <option value="fob_rmb">FOB 人民币</option>
              <option value="fob_usd">FOB 美金</option>
            </select>
          </div>

          <div>
            <small>价格: </small>
            <span>
              <input type="text" v-model="productInfo.price" />
            </span>
          </div>

          <div>
            <small>是否拿退税:</small>
            <select v-model="productInfo.refund">
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
          </div>

          <div>
            <small>订购数量:</small>
            <input
              type="text"
              v-model="productInfo.quantity"
              @blur="settlePackage()"
            />
            PCS
          </div>

          <div v-if="filterById()[0]">
            <small>包装:</small>
            {{ packageId }}
            <select
              v-if="filterById()[0].packages.length > 0"
              @blur="settlePackage()"
              v-model="packageId"
            >
              <option
                v-for="(pack, index) in filterById()[0].packages"
                :key="index"
                :value="pack.id"
              >
                {{ pack.product_package_item_num }} PCS/CTN- {{ pack.id }}
              </option>
            </select>
          </div>

          <div>
            <small>是否验货: </small>
            <span>
              <select v-model="productInfo.qualityCheck">
                <option value="true" selected>是</option>
                <option value="false">否</option>
              </select>
            </span>
          </div>

          <div>
            <small>定制: </small>
            <span>
              <input
                type="checkbox"
                id="colorManual"
                value="colorManual"
                v-model="productInfo.requirement"
              />
              <label for="colorManual">彩色说明书</label>

              <input
                type="checkbox"
                value="colorbox"
                v-model="productInfo.requirement"
              />
              <label for="colorbox">彩盒</label>

              <input
                type="checkbox"
                id="ratingLabel"
                value="ratingLabel"
                v-model="productInfo.requirement"
              />
              <label for="ratingLabel">铭牌</label>

              <input
                type="checkbox"
                id="pattern"
                value="pattern"
                v-model="productInfo.requirement"
              />
              <label for="pattern">丝印 logo</label>

              <input
                type="checkbox"
                id="shippingMark"
                value="shippingMark"
                v-model="productInfo.requirement"
              />
              <label for="shippingMark">唛头</label>

              <input
                type="checkbox"
                id="priceLabel"
                value="priceLabel"
                v-model="productInfo.requirement"
              />
              <label for="priceLabel">价格标</label>

              <input
                type="checkbox"
                id="alkalineBattery"
                value="alkalineBattery"
                v-model="productInfo.requirement"
              />
              <label for="alkalineBattery">碱性电池</label>
            </span>
          </div>

          <div>
            <small>总件数: </small>
            <span>
              <input type="text" v-model="productInfo.totalCarton" />
              件
            </span>
          </div>

          <div>
            <small>总体积: </small>
            <span>
              <input type="text" v-model="productInfo.totalSpace" />
              CBM
            </span>
          </div>

          <div>
            <small>总毛重: </small>
            <span>
              <input type="text" v-model="productInfo.totalWeight" />
              KGS
            </span>
          </div>

          <div>
            拿到产品的总数据,
            拿到每个产品的默认报价和报价条款,包装数据,从而可以计算体积
          </div>
        </div>
      </div>

      <div style="border-left: 1px solid #ccc; border-right: 1px solid #ccc;">
        <div
          class="qc-module smallfont"
          v-if="productInfo.qualityCheck == 'true'"
        >
          <div>
            <table class="table">
              <tr style="background-color: #eee;">
                <td></td>
                <td colspan="2">
                  如果返工, 费用由工厂来承担; 发票金额过小, 不安排该流程
                </td>
              </tr>
              <tr>
                <th>验货</th>
                <th>明细</th>
                <th>单价</th>
              </tr>
              <tr>
                <td>
                  <p>质检/票</p>
                  <p>{{ qcModuleCost }}</p>
                </td>
                <td>
                  <input type="text" v-model="priceSystem.quality.quantity" />
                </td>
                <td>
                  <input type="text" v-model="priceSystem.quality.price" />
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="shipment-module" v-if="ifShipment">
          <table class="table">
            <tr style="background-color: #eee;">
              <td></td>
              <td colspan="3">宁波起运价是230/单,上海260/单</td>
            </tr>
            <tr>
              <th>运输</th>
              <th>收费明细</th>
              <th>备注</th>
              <th>单价</th>
            </tr>
            <tr>
              <td rowspan="3">
                <p>运费/PC</p>
                <p>¥{{ shipmentModuleCost }}</p>
              </td>
              <td>
                <p>运费/方</p>
              </td>
              <td>*CBM來計價收費. 最小起订量5CBM</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.shipment.movement.price"
                />¥/立方
              </td>
            </tr>
            <tr>
              <td>进仓费/方</td>
              <td>*25-50元一个方, 不同仓库收费标准不一样, 因时间不同也不同</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.shipment.entrance.price"
                />¥/立方
              </td>
            </tr>
            <tr>
              <td>送货费/票</td>
              <td>物流要专门派人, 派车送货到指定仓库:
                *上海送货费150-400不等:松江, 闵行, 浦东,浦东机场,嘉定, 青浦 150;<br>
                虹桥机场, 普陀, 市区 200; 奉贤, 南汇 300;<br>
                保税区每票300-400(包括浦东机场, 外高桥保税区,洋山港保税区,海关监管仓)<br>
                *宁波送货费150, 到到梅山300;

              </td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.shipment.dispatch.price"
                />¥/票
              </td>
            </tr>
          </table>
        </div>

        <div class="export-proxy-module">
          <table class="table smallfont" style="width: 100%">
            <tr style="background-color: #eee;">
              <td></td>
              <td colspan="3">需不需要拿退税, 拿退税产品要含税价格(默认 API: 代理2%, 买单 ¥200)</td>
            </tr>
            <tr>
              <th>Proxy 出口</th>
              <th>明细</th>
              <th>备注</th>
              <th>单价</th>
            </tr>
            <tr>
              <td rowspan="2">代理
                <p>费用在FOB里计算</p>
              </td>
              <td>退税代理</td>
              <td>需要退税</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.exportProxy.refund.chargeRate"
                />%
              </td>
            </tr>

            <tr>
              <td>买单代理</td>
              <td>不需要退税</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.exportProxy.noRefund.price"
                />¥
              </td>
            </tr>
          </table>
        </div>

        <div class="bank-module">
          <table class="table smallfont">
            <tr style="background-color: #eee;">
              <td></td>
              <td colspan="3">
                客户先付定金再付尾款, 会有2-3次扣除银行费用(一次大概200元, 30美金); 
                *代理退税, 要扣2.5次银行费用(国内转大概只需要15美金);
                *买单出口, 要扣2次银行费用;
              </td>
            </tr>
            <tr>
              <th>Bank 收费</th>
              <th>明细</th>
              <th>转款次数</th>
              <th>单价</th>
            </tr>
            <tr>
              <td rowspan="2">
                转账手续费/pc
                <p>
                  ¥{{bankModuleCost}}
                </p>

              </td>
              <td>
                银行费
              
              </td>
              <td>
                <input type="text" v-model="priceSystem.bank.quantity" />
              </td>
              <td>
                <input type="text" v-model="priceSystem.bank.price" />
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="fob-module">
        <table class="table">
          <tr style="background-color: #eee;">
            <td></td>
            <td colspan="2">
              以 CBM 數計價，如一批貨的總體積低於 1 CBM 則以 1
              CBM來計價收費。很多公司有最小CBM操作计算)
            </td>
          </tr>
          <tr>
            <th>FOB</th>
            <th>收费明细</th>
            <th>单价</th>
          </tr>

          <tr>
            <td rowspan="8">
              <p>
                Tocal local charges(6%增值税)
              </p>
              <p>
                ¥{{ cfsModuleCost}}
              </p>
            </td>
            <td>CFS charge & THC/per CBM 场装费/m3</td>
            <td>
              <input type="text" v-model="priceSystem.fobCfs.cfsThc.price" />
            </td>
          </tr>
          <tr>
            <td>Documentation fees / per shipment 文件费</td>
            <td>
              <input type="text" v-model="priceSystem.fobCfs.documents.price" />
            </td>
          </tr>
          <tr>
            <td>Custom clearance / per shipment 报关费</td>
            <td>
              <input type="text" v-model="priceSystem.fobCfs.clearance.price" />
            </td>
          </tr>
          <tr>
            <td>Handling charges / per shipment 手续费</td>
            <td>
              <input type="text" v-model="priceSystem.fobCfs.handling.price" />
            </td>
          </tr>
          <tr>
            <td>Commodity inspectino fee / per shipment 商检换单费</td>
            <td>
              <input
                type="text"
                v-model="priceSystem.fobCfs.inspection.price"
              />
            </td>
          </tr>
          <tr>
            <td>ENS / per HBL</td>
            <td>
              <input type="text" v-model="priceSystem.fobCfs.ens.price" />
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="product-module" style="border-bottom: 1px solid #eee; width: 100%; padding-bottom: 0; margin-bottom: 0;">
      <table class="table">
        <tbody>
          <tr style="background-color: #eee;">
            <td rowspan="8">
              项目(定制产生的费用明细)
              <p>¥{{productModuleCost}}</p>
            </td>
            <td>收费明细</td>
            <td>备注</td>
            <td>数量</td>
            <td>合计</td>
          </tr>
 
          <tr v-if="productInfo.requirement.includes('colorManual')">
            <td>说明书/版
            </td>
            <td>
              *彩色印刷：铜版纸常规90克（可定做105克128克158克）/折页/装订）
              *量未达3000张菲林根据排版内容大小收费1个菲林160元，1次上机240元，内容多要用到2个菲林320元，2次上机480元，以此类推;
              *量满3000张只收菲林/量; *满5000张不收任何费用”
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.colorManual.quantity"
              />版
            </td>
            <td>
              {{manualCost}}
            </td>
          </tr>
          <tr v-if="productInfo.requirement.includes('colorbox')">
            <td>
              彩盒/版
            </td>
            <td>
              "常规300克面纸B牛加厚亮膜（可定做如350克面纸A牛加厚、亚膜、UV、烫银、烫金、专色、根据客户材料定做）带提手/不带提手"
              *普通印刷量未达2000只收菲林费200元，上机费300元;
              *量达2000只收菲林200元;
              量达到3000只不收任何费用（专色、小盒型-H1301、UV、烫银、烫金看具体要求收费或者单价高）
            </td>
            <td>
              <input type="text" v-model="priceSystem.product.box.quantity" />版
            </td>
            <td>
              {{colorboxCost}}
            </td>
          </tr>
          <tr v-if="productInfo.requirement.includes('ratingLabel')">
            <td>铭牌/票 常规普通不干胶（可定做如亚银、PET、根据客户样）</td>
            <td>
              *最小收费150;1500-2999台, 0.1元/张; 大于3000台,不收费;
              *厨房秤后面的标贴尺寸需要自己确认给工厂
              *秤上是否需要ＱＣ标也要确认一下。
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.ratingLabel.quantity"
              />票
            </td>
            <td>
              {{ratingLabelCost}}
            </td>
            <td></td>
          </tr>

          <tr v-if="productInfo.requirement.includes('priceLabel')">
            <td>价格标</td>
            <td>
              * 环保, 可以移除, 每张0.2元, 最少收费150;
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.priceLabel.quantity"
              />
            </td>
            <td>
              {{priceLabelCost}}
            </td>
          </tr>

          <tr v-if="productInfo.requirement.includes('pattern')">
            <td>丝印单色 Logo</td>
            <td>
              *最少收费250;
              *小于1000台, 0.3元;
              *小于2000台, 0.2元;
              *大于等于2000台, 不收费;
            </td>
            <td>
              <!-- <input
                type="text"
                v-model="priceSystem.product.pattern.quantity"
              /> -->
            </td>
            <td>{{patternCost}}</td>
          </tr>

          <tr v-if="productInfo.requirement.includes('shippingMark')">
            <td>
              外箱: 常规5层A+C打钉（可定做7层A+C 、加厚、深圳联星材料、无钉）
            </td>
            <td>
              *量未达50只版费25元;
              *外箱是否需要打包带，打包带要井字或工字需要注明;
              *唛头是否定做，一般唛头为一色黑色，特殊颜色需注明;
            </td>
            <td>
              <!-- <input
                type="text"
                v-model="priceSystem.product.cartonMark.quantity"
              /> -->
            </td>
            <td>{{shippingMarkCost}}</td>
          </tr>
          <tr v-if="productInfo.requirement.includes('alkalineBattery')">
            <td>电池数目/台</td>
            <td>*是否需要电池, 需要碱性电池, 另外+0.25元/个</td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.battery.quantity"
              />个/台产品
            </td>
           
            <td>
              {{batteryCost}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr />
  </div>
</template>
<script>
import VAT from "../../api/tax";

export default {
  name: "Price",
  data() {
    return {
      VAT: VAT,
      productsData: "",
      packageId: "",
      selectedSupplier: "",
      selectedPackage: "",
      productInfo: {
        productId: "",
        supplierId: "",
        priceTerm: "",
        price: "",
        refund: "",
        refundRate: "",
        quantity: "",
        qualityCheck: "",
        factoryTaxRate: "",
        requirement: [],
        manual: [],
        totalWeight: "",
        totalSpace: "",
        totalCarton: ""
      },
      priceSystem: {
        profitRate: VAT.PROFIT,
        currencyRate: VAT.CURRENCY,
        product: {
          // bag: {
          //   quantity: "",
          //   price: ""
          // },
          plainManual: {
            quantity: 1,
            price: ""
          },
          colorManual: {
            quantity: 1,
            price: ""
          },
          box: {
            quantity: 1,
            price: ""
          },
          ratingLabel: {
            quantity: 1,
            price: ""
          },
          priceLabel: {
            quantity: 1,
            price: ""
          },
          pattern: {
            quantity: 1,
            price: ""
          },
          cartonMark: {
            quantity: 1,
            price: ""
          },
          battery: {
            quantity: 2,
          }
        },
        quality: {
          price: 1200,
          quantity: 1
        },
        shipment: {
          movement: {
            price: 60
          },
          entrance: {
            price: 40
          },
          dispatch: {
            price: 170
          }
        },
        fobCfs: {
          cfsThc: {
            price: 100
          },
          documents: {
            price: 500
          },
          clearance: {
            price: 125
          },
          handling: {
            price: 10
          },
          inspection: {
            price: 0
          },
          ens: {
            price: 100
          }
        },
        exportProxy: {
          refund: {
            chargeRate: VAT.EXPORTPROXYRATE,
          },
          noRefund: {
            price: VAT.EXPORTPROXYMONEY,
          }
        },
        bank: {
          quantity: 2,
          price: 200,
        }
      }
    };
  },
  computed: {
    qcModuleCost() {
      if(this.productInfo.qualityCheck == 'true') {
        return (
          (Number(this.priceSystem.quality.quantity) * Number(this.priceSystem.quality.price)) /
          Number(this.productInfo.quantity)
        );
      }
      return "0";
    },
    filterById() {
      return () => {
        return this.productsData.filter(
          p => p.id == this.productInfo.productId
        );
      };
    },
    productQuantity() {
      return this.productInfo.quantity;
    },
    ifShipment() {
      if (
        this.productInfo.priceTerm == "exw_no_tax" ||
        this.productInfo.priceTerm == "exw_tax"
      )
        return true;
      return false;
    },
    shipmentModuleCost() {
      if (this.productInfo.totalSpace > 0) {
        if (this.productInfo.priceTerm == 'exw_no_tax' || this.productInfo.priceTerm == 'exw_tax') {
          let i =
          Math.ceil(this.productInfo.totalSpace) *
          Number(this.priceSystem.shipment.movement.price);
          let q = Math.ceil(this.productInfo.totalSpace) * Number(this.priceSystem.shipment.entrance.price);
          let e = Number(this.priceSystem.shipment.dispatch.price);
          if(this.productInfo.quantity>0) {
            return (i + q + e) >400? (i + q + e)/ Number(this.productInfo.quantity): 400/Number(this.productInfo.quantity);
          }
        }
        // return "0";
      }
      return "0";
    },
    cfsModuleCost() {
      if (this.productInfo.totalSpace > 0 && this.productInfo.quantity > 0) {
        let a =
          Number(this.priceSystem.fobCfs.cfsThc.price) * Number(this.productInfo.totalSpace);
        let b =
          Number(this.priceSystem.fobCfs.documents.price) +
          Number(this.priceSystem.fobCfs.clearance.price) +
          Number(this.priceSystem.fobCfs.handling.price) +
          Number(this.priceSystem.fobCfs.inspection.price) +
          Number(this.priceSystem.fobCfs.ens.price);
        let totalVat = (a + b) * (parseInt(VAT.SHIPPING) / 100 + 1);
        return Number(totalVat / this.productInfo.quantity);
      }
      return "0";
    },
    bankModuleCost() {
      if(this.productInfo.quantity>0) {
      return this.priceSystem.bank.quantity*this.priceSystem.bank.price/this.productInfo.quantity;
      }
      return "0";
    },
    // productModualCost = 
    // + manualCost 
    // + colorboxCost 
    // + 
    manualCost() {
      if(this.productInfo.requirement.includes('colorManual')){
        if(this.productInfo.quantity>0 && this.productInfo.quantity<3000) {
          let i = 400;
          return i * this.priceSystem.product.colorManual.quantity;
        }
        if(this.productInfo.quantity>=3000 && this.productInfo.quantity<5000) {
          let i = 160;
          return i * this.priceSystem.product.colorManual.quantity;
        }
        if(this.productInfo.quantity>=5000) {
          if(this.priceSystem.product.colorManual.quantity>=2) {
            let i = 400;
            let q = this.priceSystem.product.colorManual.quantity;
            return i * (q-1);
          }
        }
      }
      return "0";
    },
    colorboxCost() {
      if(this.productInfo.requirement.includes('colorbox')) {
        if(this.productInfo.quantity>0 && this.productInfo.quantity<2000) {
          let i = 500;
          return i * this.priceSystem.product.box.quantity;
        }
        if(this.productInfo.quantity>= 2000 && this.productInfo.quantity<3000) {
          let i = 200;
          return i * this.priceSystem.product.box.quantity;
        } 
        return "0";
      }
      return "0";
    },
    ratingLabelCost() {
      if(this.productInfo.requirement.includes('ratingLabel')) {
        if(this.productInfo.quantity<1500) {
          let i = 150;
          return i * this.priceSystem.product.ratingLabel.quantity;
        }
        if(this.productInfo.quantity>=1500 && this.productInfo.quantity<3000) {
          let i = 0.1;
          return i * this.productInfo.quantity;
        }
        return "0";
      }
      return "0";
    },
    // 定义价格标是 0.2元/张
    priceLabelCost() {
      if(this.productInfo.requirement.includes('priceLabel')) {
        if(this.productInfo.quantity > 0) {
          let i = 0.2;
          return i * this.productInfo.quantity > 150? i * this.productInfo.quantity : 150;
        }
        return "0";
      }
      return "0";
    },
    // 单个产品费用, 不能均分;
    patternCost() {
      if(this.productInfo.requirement.includes('pattern')) {
        if(this.productInfo.quantity<=1000) {
          let i = 0.3;
          return i * this.productInfo.quantity <250? 250:i * this.productInfo.quantity;
        } else if (this.productInfo.quantity>1000 && this.productInfo.quantity<=2000) {
          let i = 0.2;
          return i * this.productInfo.quantity;
        } else {
          return "0";
        }
      }
      return "0";
    },
    shippingMarkCost() {
      if(this.productInfo.totalCarton.length>0 && this.productInfo.totalCarton<50) {
        let i = 25;
        return i;
      } else {
        return "0";
      }
    },
    batteryCost() {
      if(this.productInfo.requirement.includes('alkalineBattery')) {
        let i = 0.25;
        return i * this.priceSystem.product.battery.quantity * this.productInfo.quantity;
      }
      return "0";
    },
    productModuleCost() {
      let i =  Number(this.colorboxCost) 
      + Number(this.manualCost)
      + Number(this.ratingLabelCost)
      + Number(this.priceLabelCost)
      + Number(this.patternCost)
      + Number(this.shippingMarkCost)
      + Number(this.batteryCost);
      return Number(i / this.productInfo.quantity);
    },
    FOBCOST() {
      // 1 if productInfo.priceTerm == 'exw_no_tax';
      // 直接算出来拿退税和不拿退税的价格;
      if(this.productInfo.priceTerm == 'exw_no_tax' && this.productInfo.totalSpace>0 && this.productInfo.factoryTaxRate>0) {
        //拿退税, 
        let purchaseCost = this.productInfo.price*(1+this.productInfo.factoryTaxRate/100)*(100+VAT.COMMODITY-this.productInfo.refundRate)/(100+VAT.COMMODITY) + Number(this.qcModuleCost) + Number(this.shipmentModuleCost) + Number(this.cfsModuleCost) + Number(this.bankModuleCost) + Number(this.productModuleCost);

        // 实际成本 = 
        // 出厂不含税产品费用 * (1 + 工厂税率 / 100 ) 
        // + 商检费 
        //+ 运费 
        // + fobCfsModule 费用 
        //+ productModule 费用
        // + 银行操作费用
        // - o(退税费用);
        let CURRENCY = this.priceSystem.currencyRate;
        let PROFIT= this.priceSystem.profitRate;
        let PROXYRATE = this.priceSystem.exportProxy.refund.chargeRate;

        let sellingCost = (purchaseCost/CURRENCY) /(1-PROFIT/100-PROXYRATE/100);

        let PROXYCOST = this.priceSystem.exportProxy.noRefund.price/this.productInfo.quantity;

        let purchaseCost2 = Number(this.productInfo.price) + Number(this.qcModuleCost) + Number(this.shipmentModuleCost) + Number(this.cfsModuleCost) + Number(this.bankModuleCost) + Number(this.productModuleCost)+ PROXYCOST;

        let sellingCost2 = (purchaseCost2/CURRENCY)/(1-PROFIT/100);

        return '$'+sellingCost + ' 总支出:¥'+purchaseCost+'拿退税<--||-->不拿$' + sellingCost2+' 总支出:¥'+purchaseCost2;
      }
      // 2 if productInfo.priceTerm = 'exw_tax';
      if (this.productInfo.priceTerm == 'exw_tax' && this.productInfo.totalSpace>0) {
        let purchaseCost = this.productInfo.price*(100+VAT.COMMODITY-this.productInfo.refundRate)/(100+VAT.COMMODITY) + Number(this.qcModuleCost) + Number(this.shipmentModuleCost) + Number(this.cfsModuleCost) + Number(this.bankModuleCost) + Number(this.productModuleCost);

        let CURRENCY = this.priceSystem.currencyRate;
        let PROFIT= this.priceSystem.profitRate;
        let PROXYRATE = this.priceSystem.exportProxy.refund.chargeRate;

        let sellingCost = (purchaseCost/CURRENCY) /(1-PROFIT/100-PROXYRATE/100);

        return '$'+sellingCost + ' 总支出:¥'+purchaseCost+'拿退税<--|';
      }
      // 3 if productInfo.priceTerm = 'cpt_no_tax';
      if (this.productInfo.priceTerm == 'cpt_no_tax' && this.productInfo.totalSpace>0 && this.productInfo.factoryTaxRate>0) {
        let purchaseCost = this.productInfo.price*(1+this.productInfo.factoryTaxRate/100)*(100+VAT.COMMODITY-this.productInfo.refundRate)/(100+VAT.COMMODITY) + Number(this.qcModuleCost) + Number(this.cfsModuleCost) + Number(this.bankModuleCost) + Number(this.productModuleCost);

        let CURRENCY = this.priceSystem.currencyRate;
        let PROFIT= this.priceSystem.profitRate;
        let PROXYRATE = this.priceSystem.exportProxy.refund.chargeRate;

        let sellingCost = (purchaseCost/CURRENCY) /(1-PROFIT/100-PROXYRATE/100);

        let PROXYCOST = this.priceSystem.exportProxy.noRefund.price/this.productInfo.quantity;

        let purchaseCost2 = Number(this.productInfo.price) + Number(this.qcModuleCost) + Number(this.cfsModuleCost) + Number(this.bankModuleCost) + Number(this.productModuleCost)+ PROXYCOST;

        let sellingCost2 = (purchaseCost2/CURRENCY)/(1-PROFIT/100);

        return '$'+sellingCost + ' 总支出:¥'+purchaseCost+'拿退税<--||-->不拿$' + sellingCost2+' 总支出:¥'+purchaseCost2;
      }

      // 4 if productInfo.priceTerm = 'cpt_tax';
      if (this.productInfo.priceTerm == 'cpt_tax' && this.productInfo.totalSpace>0) {
        let purchaseCost = this.productInfo.price*(100+VAT.COMMODITY-this.productInfo.refundRate)/(100+VAT.COMMODITY) + Number(this.qcModuleCost) + Number(this.cfsModuleCost) + Number(this.bankModuleCost) + Number(this.productModuleCost);

        let CURRENCY = this.priceSystem.currencyRate;
        let PROFIT= this.priceSystem.profitRate;
        let PROXYRATE = this.priceSystem.exportProxy.refund.chargeRate;

        let sellingCost = (purchaseCost/CURRENCY) /(1-PROFIT/100-PROXYRATE/100);

        return '$'+sellingCost + ' 总支出:¥'+purchaseCost+'拿退税<--|';
      }
      // 5 if productInfo.priceTerm = 'fob_rmb';
      // 产品含税含操作费; 
      if (this.productInfo.priceTerm == 'fob_rmb') {
        let purchaseCost = this.productInfo.price*(100+VAT.COMMODITY-this.productInfo.refundRate)/(100+VAT.COMMODITY) + Number(this.qcModuleCost) + Number(this.bankModuleCost) + Number(this.productModuleCost);

        let CURRENCY = this.priceSystem.currencyRate;
        let PROFIT= this.priceSystem.profitRate;
        let PROXYRATE = this.priceSystem.exportProxy.refund.chargeRate;

        let sellingCost = (purchaseCost/CURRENCY) /(1-PROFIT/100-PROXYRATE/100);

        return '$'+sellingCost + ' 总支出:¥'+purchaseCost+'拿退税<--|';
      }
      // 6 if productInfo.priceTerm = 'fob_usd';
      if (this.productInfo.priceTerm == 'fob_usd') {
        let CURRENCY = this.priceSystem.currencyRate;
        let otherCost = Number(this.qcModuleCost) + Number(this.bankModuleCost) + Number(this.productModuleCost/CURRENCY);
        let purchaseCost = Number(this.productInfo.price) + Number(otherCost/CURRENCY);

        let PROFIT= this.priceSystem.profitRate;

        let sellingCost = purchaseCost /(1-PROFIT/100);

        return '$'+ sellingCost;
      }
      return "0";
    }
  },
  created() {
    this.axios
      .get(this.GLOBAL.baseUrl + "/product")
      .then(res => (this.productsData = res.data))
      .catch(err => alert(err));
  },
  methods: {
    settlePrice() {
      if (this.filterById()[0].suppliers.length > 0) {
        this.selectedSupplier = this.filterById()[0].suppliers.filter(
          s => s.id == this.productInfo.supplierId
        );
        // this.productInfo.refundRate = this.
        this.productInfo.priceTerm = this.selectedSupplier[0].purchase_info.price_term;
        this.productInfo.price = this.selectedSupplier[0].purchase_info.price;
        this.productInfo.factoryTaxRate = this.selectedSupplier[0].factory_tax_rate;
      }
    },
    settlePackage() {
      if (this.filterById()[0].packages.length > 0) {
        if (this.productInfo.quantity > 0) {
          let q = this.filterById()[0].packages.filter(
            p => p.id == this.packageId
          );
          if(q.length>0) {
            let i = this.productInfo.quantity / q[0].product_package_item_num;
            this.productInfo.totalWeight = i * q[0].product_package_gross_weight;
            this.productInfo.totalSpace = i * q[0].product_package_cbm;
            this.productInfo.totalCarton = i;
          } 
        }
      }
    },
    settleRefundRate() {
      this.productInfo.refundRate = this.filterById()[0].refund_rate;
    }
  },
  watch: {
    productQuantity() {
      if (this.selectedPackage.length > 0) {
        this.settlePackage();
      }
    }
  }
};
</script>
<style>
.price-product-info {
  display: flex;
  justify-content: space-between;
  font-weight: 100;
  font-size: 6px;
}
.even-distribute {
  display: flex;
  justify-content: space-around;
}
</style>
