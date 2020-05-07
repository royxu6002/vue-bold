<template>
  <div class="price-system-page row mt-3" style="padding: 0 15px;">
    <div style="font-size: 20px; text-align: center; color: blue;">
          <small>FOB 价格</small>
          <span>us$ 8.90/unit</span>
          <small>汇率 USDRMB</small>
          <span>7.10</span>
          {{productInfo}}
      </div>
      <hr>
    <div class="price-product-info">
      <div style="border-top: 1px solid #ccc;">
        <!-- 基本产品信息模块 -->
        <div style="display: flex; justify-content: space-around; flex-direction: column;">
          <div>
            <small>选择产品:</small>
            <select v-model="productInfo.productId">
              <option v-for="(pro, index) in productsData" :key="index" :value="pro.id">
                {{pro.name}}
              </option>
            </select>
          </div>

          <div v-if="filterById()[0]">
            <small>供应商:</small>
            <select v-if="filterById()[0].suppliers.length>0" @blur="settlePrice()" v-model="productInfo.supplierId">
              <option v-for="(su, index) in filterById()[0].suppliers" :key="index" :value="su.id">
                {{su.name}}
              </option>
            </select>    
          </div>

          <div>
              <small>工厂税点: </small>
              <span>
                <input type="text" v-model="productInfo.factoryTaxRate"> 
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
                <option value="fob_rmn">FOB 人民币</option>
                <option value="fob_usd">FOB 美金</option>
              </select>
          </div>

          <div>
              <small>价格: </small>
              <span>
                <input type="text" v-model="productInfo.price">
              </span>
          </div>

          

          <div>
            <small>订购数量:</small>
            <input type="text" v-model="productInfo.quantity" @blur="settlePackage()"> 
            PCS
          </div>

          <div v-if="filterById()[0]">
            <small>包装:</small>
            {{packageId}}
            <select v-if="filterById()[0].packages.length>0" @blur="settlePackage()" v-model="packageId">
              <option v-for="(pack, index) in filterById()[0].packages" 
              :key="index" 
              :value="pack.id">
                {{pack.product_package_item_num}} - {{pack.id}}
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
                <input type="radio" id="plainManual" value="plainManual" v-model="productInfo.manual">
                  <label for="plainManual">黑白说明书</label>
                
                  <input type="radio" id="colorManual" value="colorManual" v-model="productInfo.manual">
                  <label for="colorManual">彩色说明书</label>

                <input type="checkbox" value="colorbox" v-model="productInfo.requirement">
                <label for="colorbox">彩盒</label>
                 
                <input type="checkbox" id="ratingLabel" value="ratingLabel" v-model="productInfo.requirement">
                <label for="ratingLabel">铭牌</label>

                <input type="checkbox" 
                id="priceLabel" value="priceLabel" v-model="productInfo.requirement">
                <label for="priceLabel">价格标</label>

                <input type="checkbox" 
                id="alkalineBattery" value="alkalineBattery" v-model="productInfo.requirement">
                <label for="alkalineBattery">碱性电池</label>

                <input type="checkbox" 
                id="pattern" value="pattern" v-model="productInfo.requirement">
                <label for="pattern">多色丝印</label>

                <input type="checkbox" 
                id="shippingMark" value="shippingMark" v-model="productInfo.requirement">
                <label for="shippingMark">唛头</label>

              </span>
          </div>

          <div>
              <small>总件数: </small>
              <span>
                <input type="text" v-model="productInfo.totalCarton">
                 件
              </span>
          </div>

          <div>
              <small>总体积: </small>
              <span>
                <input type="text" v-model="productInfo.totalSpace"> 
                CBM
              </span>
          </div>

          <div>
              <small>总毛重: </small>
              <span>
                <input type="text" v-model="productInfo.totalWeight">
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
        <div class="qc-module smallfont" v-if="productInfo.quantity>=1000">
            <div>
              <table class="table">
                <tr style="background-color: #eee;">
                  <td></td>
                  <td colspan="4">如果返工, 费用由工厂来承担; 发票金额过小, 不安排该流程</td>
                </tr>
                <tr>
                  <td>
                    
                    <p>质检/票</p>
                    <p>{{qcModuleCost}}</p>

                  </td>
                  <td>
                    <input type="text" v-model="priceSystem.quality.quantity" />
                  </td>
                  <td>
                    <input type="text" v-model="priceSystem.quality.price" />
                  </td>
                  <td>

                  </td>
                </tr>
              </table>
            </div>
        </div>

        <div class="shipment-module smallfont">
          <table class="table">
            <tr style="background-color: #eee;">
              <td></td>
              <td colspan="5">(以 CBM 數計價，如一批貨的總體積低於 1 CBM 則以 1
                CBM來計價收費. 最小起订量 5CBM)</td>
            </tr>
            <tr>
              <td rowspan="2">运费</td>
              <td>运输/方</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.shipment.movement.quantity"
                />
              </td>
              <td>
                <input type="text" v-model="priceSystem.shipment.movement.price" />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>进仓费/票</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.shipment.entrance.quantity"
                />
              </td>
              <td>
                <input type="text" v-model="priceSystem.shipment.entrance.price" />
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>

        <div class="export-proxy-module">
          <table class="table smallfont">
            <tr>
              <td rowspan="2">代理</td>
              <td>退税代理</td>
              <td>需要退税</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.exportProxy.refund.quantity"
                />
              </td>
              <td>
                <input type="text" v-model="priceSystem.exportProxy.refund.price" />
              </td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>买单代理</td>
              <td>不需要退税</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.exportProxy.noRefund.quantity"
                />
              </td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.exportProxy.noRefund.price"
                />
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>

        <div class="bank-module">
          <table class="table smallfont">
            <tr style="background-color: #eee;">
              <td></td>
              <td colspan="5">客户分几次付款取决于发票金额; 银行需要转两-四次, 如果是走代理退税路径</td>
            </tr>
            <tr>
              <td rowspan="2">银行</td>
              <td>
                银行费
              </td>
              <td>
                <input type="text" v-model="priceSystem.bank.quantity" />
              </td>
              <td>
                <input type="text" v-model="priceSystem.bank.price" />
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>

      <div class="fob-module">
        <table class="table">
          <tr style="background-color: #eee;">
            <td></td>
            <td colspan="5">以 CBM 數計價，如一批貨的總體積低於 1 CBM 則以 1 CBM來計價收費。很多公司有最小CBM操作计算)</td>
          </tr>
          <tr>
            <th>FOB</th>
            <th>收费明细</th>
            <th>数量</th>
            <th>单价</th>
            <th>合计</th>
            <th>单分价</th>
          </tr>
          
            <tr>
              <td rowspan="8">
                  Tocal local charges
              </td>
              <td>CFS charge & THC/per CBM 场装费</td>                
              <td>
                <input type="text" v-model="priceSystem.fobCfs.cfsThc.quantity" />
              </td>
              <td>
                <input type="text" v-model="priceSystem.fobCfs.cfsThc.price" />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Documentation fees / per shipment 
                文件费
              </td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.fobCfs.documents.quantity"
                />
              </td>
              <td>
                <input type="text" v-model="priceSystem.fobCfs.documents.price" />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Custom clearance / per shipment 报关费</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.fobCfs.clearance.quantity"
                />
              </td>
              <td>
                <input type="text" v-model="priceSystem.fobCfs.clearance.price" />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Handling charges / per shipment 手续费</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.fobCfs.handling.quantity"
                />
              </td>
              <td>
                <input type="text" v-model="priceSystem.fobCfs.handling.price" />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Commodity inspectino fee / per shipment 商检换单费</td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.fobCfs.inspection.quantity"
                />
              </td>
              <td>
                <input
                  type="text"
                  v-model="priceSystem.fobCfs.inspection.price"
                />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>ENS / per HBL</td>
              <td>
                <input type="text" v-model="priceSystem.fobCfs.ens.quantity" />
              </td>
              <td>
                <input type="text" v-model="priceSystem.fobCfs.ens.price" />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>6% VAT</td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td></td>
              <td></td>
            </tr>
        </table>
      </div>
    </div>
      
    <div class="product-module" style="border-bottom: 1px solid #eee;">
      <table class="table">
        <thead style="background-color: #eee;">
          <th>项目</th>
          <th>品名</th>
          <th>备注</th>
          <th>数量</th>
          <th>单价</th>
          <th>合计</th>
          <th>单位价</th>
        </thead>
        <tbody>
          <tr>
            <!-- <td rowspan="9">产品(除产品本身外, 其他要求)</td> -->
            <!-- <td>塑料袋</td>
            <td>
              PE常规厚度单面2.5丝（可定做单面4丝、根据客户要求;
              可定做印刷资料量未达5万菲林费200元（目前没有收过版费）
            </td>
            <td>
              <input type="text" v-model="priceSystem.product.bag.quantity" />
            </td>
            <td>
              <input type="text" v-model="priceSystem.product.bag.price" />
            </td>
            <td>
              total
            </td>
            <td></td> -->
          </tr>
          <tr>
            <td rowspan="8">定制产生的费用明细</td>
            <td rowspan="2">
              说明书 黑白印刷：双胶纸常规80克（可定做90克100克）/折页/装订）
              彩色印刷：铜版纸常规90克（可定做105克128克158克）/折页/装订）
            </td>
            <td>
              *量未达3000张菲林根据排版内容大小收费1个菲林25元，内容多要用到2个菲林的话50元，以此类推;
              *5000张不收任何费用”
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.plainManual.quantity"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.plainManual.price"
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              *量未达3000张菲林根据排版内容大小收费1个菲林160元，1次上机240元，内容多要用到2个菲林320元，2次上机480元，以此类推;
              *量满3000张只收菲林/量; *满5000张不收任何费用”
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.colorManual.quantity"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.colorManual.price"
              />
            </td>
          </tr>
          <tr>
            <td>
              彩盒:
              "常规300克面纸B牛加厚亮膜（可定做如350克面纸A牛加厚、亚膜、UV、烫银、烫金、专色、根据客户材料定做）带提手/不带提手"
            </td>
            <td>
              *普通印刷量未达2000只收菲林费200元，上机费300元;
              *量达2000只收菲林200元;
              量达到3000只不收任何费用（专色、小盒型-H1301、UV、烫银、烫金看具体要求收费或者单价高）
            </td>
            <td>
              <input type="text" v-model="priceSystem.product.box.quantity" />
            </td>
            <td>
              <input type="text" v-model="priceSystem.product.box.price" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>铭牌 常规普通不干胶（可定做如亚银、PET、根据客户样）</td>
            <td>
              *厨房秤后面的标贴尺寸需要自己确认给工厂
              *秤上是否需要ＱＣ标也要确认一下。
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.ratingLabel.quantity"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.ratingLabel.price"
              />
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>价格标</td>
            <td>
              * 环保, 可以移除
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.priceLabel.quantity"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.priceLabel.price"
              />
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>丝印</td>
            <td>
              * 默认报价包含2色(2色图案或者纯色+logo)
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.pattern.quantity"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.pattern.price"
              />
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>
              外箱: 常规5层A+C打钉（可定做7层A+C 、加厚、深圳联星材料、无钉）
            </td>
            <td>
              *量未达50只版费25元
              *外箱是否需要打包带，打包带要井字或工字需要注明
              *唛头是否定做，一般唛头为一色黑色，特殊颜色需注明
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.cartonMark.quantity"
              />
            </td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.cartonMark.price"
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>电池</td>
            <td>是否需要电池, 碱性电池</td>
            <td>
              <input
                type="text"
                v-model="priceSystem.product.battery.quantity"
              />
            </td>
            <td>
              <input type="text" v-model="priceSystem.product.battery.price" />
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    

    <hr />
  </div>
</template>
<script>
export default {
  name: "Price",
  data() {
    return {
      productsData: "",
      packageId: "",
      selectedSupplier: "",
      selectedPackage: "",
      productInfo: {
        productId: '',
        supplierId: '',
        priceTerm: '',
        price: '',
        quantity: '',
        qualityCheck: '',
        factoryTaxRate: '',
        requirement: [
        
        ],
        manual: [],
        totalWeight: "",
        totalSpace: "",
        totalCarton: ""
      },
      priceSystem: {
        product: {
          // bag: {
          //   quantity: "",
          //   price: ""
          // },
          plainManual: {
            quantity: "",
            price: ""
          },
          colorManual: {
            quantity: "",
            price: ""
          },
          box: {
            quantity: "",
            price: ""
          },
          ratingLabel: {
            quantity: "",
            price: ""
          },
          priceLabel: {
            quantity: "",
            price: ""
          },
          pattern: {
            quantity: "",
            price: ""
          },
          cartonMark: {
            quantity: "",
            price: ""
          },
          self: {
            price: "",
            quantity: 1
          },
          battery: {
            price: "",
            quantity: 1
          }
        },
        quality: {
          price: 1200,
          quantity: 1
        },
        shipment: {
          movement: {
            quantity: "",
            price: 80,
          },
          entrance: {
            quantity: 1,
            price: 200,
          }
        },
        fobCfs: {
          cfsThc: {
            quantity: "",
            price: ""
          },
          documents: {
            quantity: "",
            price: ""
          },
          clearance: {
            quantity: "",
            price: ""
          },
          handling: {
            quantity: "",
            price: ""
          },
          inspection: {
            quantity: "",
            price: ""
          },
          ens: {
            quantity: "",
            price: ""
          }
        },
        exportProxy: {
          refund: {
            quantity: "",
            price: ""
          },
          noRefund: {
            quantity: "",
            price: ""
          }
        },
        bank: {
          quantity: "",
          price: ""
        }
      }
    };
  },
  computed: {
    qcModuleCost() {
      return this.priceSystem.quality.quantity*this.priceSystem.quality.price/this.productInfo.quantity
    },
    filterById() {
      return () => {
        return this.productsData.filter(p => p.id == this.productInfo.productId);
      }
    },
    productQuantity() {
      return this.productInfo.quantity;
    }
  },
  created() {
    this.axios.get(this.GLOBAL.baseUrl+"/product")
    .then(res => this.productsData = res.data)
    .catch(err => alert(err))
  },
  methods: {
    settlePrice() {
      if(this.filterById()[0].suppliers.length>0) {
        this.selectedSupplier= this.filterById()[0].suppliers.filter(s => s.id == this.productInfo.supplierId)
        this.productInfo.priceTerm = this.selectedSupplier[0].purchase_info.price_term;
        this.productInfo.price = this.selectedSupplier[0].purchase_info.price;
        this.productInfo.factoryTaxRate = this.selectedSupplier[0].factory_tax_rate;
      }
    },
    settlePackage() {
      if (this.filterById()[0].packages.length>0) {
        if(this.productInfo.quantity>0) {
          let q = this.filterById()[0].packages.filter(p =>p.id == this.packageId);
          let i = (this.productInfo.quantity/q[0].product_package_item_num);
          this.productInfo.totalWeight = i*q[0].product_package_gross_weight;
          this.productInfo.totalSpace = i*q[0].product_package_cbm;
          this.productInfo.totalCarton = i;
        }
      }
    }
  },
  watch: {
    productQuantity() {
      if(this.selectedPackage.length>0) {
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
</style>
