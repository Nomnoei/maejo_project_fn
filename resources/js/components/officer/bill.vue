<template>
  <div id="test">
    <button @click="generateReport">print</button>
      <!-- <button @click="test">print</button>
      <p class="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p>
      <h1 style="color:red">wqewqe</h1>
      <a href="#" class="btn btn-primary">555</a>
      <h1>ภาษาไทย</h1>
      <table>
        <tr>
        <th>dfdsfsdf</th>
        <th>sdfsdf</th>
        </tr>
        <tr>
          <td>fgdfg</td>
          <td>dsfsdf</td>
        </tr>
        <tr>
          <td>fgdfg</td>
          <td>dsfsdf</td>
        </tr>

      </table> -->
      <vue-html2pdf
       :show-layout="false"
       :enable-download="true"
       :preview-modal="true"
       :paginate-elements-by-height="1400"
       filename="haha"
       :pdf-quality="2"
       pdf-format="a4"
       pdf-orientation="portrait"
       pdf-content-width="800px"

       @progress="onProgress($event)"
       @hasStartedGeneration="hasStartedGeneration()"
       @hasGenerated="hasGenerated($event)"
       ref="html2Pdf"
   >
       <section slot="pdf-content">
           <!-- PDF Content Here -->
           <div class="container">
             <br><br><br>
               <div class="info floatright">
                 <div align=right style="margin-top:12px;">
                   พิมพ์ใบเรียกชำระเงิน
                 </div>
                 <div style="margin-top:27px;" align=right>
              เลขที่ : 1 <br>

              วันที่ 12/05/2020
            </div>
               </div>
               <div class="header" align=left>
            <img src="image/logo_2.png" > <br><br>
            สำนักงานเทศบาลเมืองแม่โจ้ ต.หนองหาร อ.สันทราย จ.เชียงใหม่ 50290 <br>
            โทรศัพท์ 053-498621
        </div>
        <div class="data_user">
          เรียกเก็บไปยัง: <br>
          eXp9Dg9RGkxXVk4bUxsAAgAr <br>

        <br>
          0900000000
        </div>
          <div class="data_show">
            <table width=100%>
                <tr align=center><th width="70%">คำอธิบาย</th><th>จำนวนเงิน</th></tr>

                                <tr>
                                    <td width=80%>
                                        <font style="margin-left:5px;">5 ซอย : - หมู่บ้าน : xxxx ตำบล : xxx เงินค่าเก็บขยะทั้งหมด 3 เดือน</font> <br>
                                    </td>
                                    <td align=right>
                                        <font style="margin-right:3px;">1000</font>
                                    </td>
                                </tr>

                                <tr>
                                    <td width=80%>
                                        <font style="margin-left:5px;">ยอดค้างชำระ0 เดือนที่แล้วของ<br> 5 ซอย : - หมู่บ้าน : xxxx ตำบล : xxx  </font> <br>
                                    </td>
                                    <td align=right>
                                        <font style="margin-right:3px;">0</font>
                                    </td>
                                </tr>

                <tr>
                  <td align=right>ผลรวม</td>
                  <td align=right>
                      <font style="margin-right:3px;">00</font>
                  </td>
                </tr>

            </table>
          </div>
          <br><br>
              <h3 align=center>เทศบาลเมืองแม่โจ้ ขอขอบคุณที่ให้ความร่วมมือ</h3>
             </div>
             <div class="page-break"></div>

       </section>

   </vue-html2pdf>


  </div>


</template>

<script>
// import defaultVFS from '../../defaultVFS';

import jsPDF from 'jspdf';
import Kanit from './Kanit-Regular-normal.js';
import VueHtml2pdf from 'vue-html2pdf'
// import KanitFont from './Kanit-Regular.ttf';
export default {
    components: {
      VueHtml2pdf
    },
    data() {
        return {

        }
    },
    methods:{
      generateReport () {
           this.$refs.html2Pdf.generatePdf()
       },
      test(){
        var doc = new jsPDF()
        // doc.addFileToVFS('Kanit-Regular.ttf', Kanit);
        // doc.addFont('Kanit-Regular.ttf', 'Kanit-Regular', 'normal');
        doc.setFont('Kanit-Regular');

        // doc.setFontSize(22)
        // doc.text(20, 20, 'This is a title')
        doc.setFontSize(16)
        doc.text(20, 50, 'ภาษาไทย')
        //   doc.output('dataurlnewwindow', {})

        // doc.fromHTML($("#test").html(),15,15,{
        //   "width":170,
        // });
        doc.output('dataurlnewwindow', {})
      }
    }
}

</script>
<style>
.header {
        height: auto;
        width:60%;

        /* border: solid 1px black; */
      }
      .container {
            width: 100%;
            height: auto;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;

            /* border: solid 1px red; */
        }
        .info {
          height: auto;
          width:35%;

          /* border: solid 1px black; */
        }
        .floatright {
            float: right;
        }
        .data_user{
          margin-top: 20px;
        }
        .data_show {
          margin-top: 20px;
      }
      table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        .header img {
          margin-top: 10px;
          width: 15rem;
      }
      .page-break {
            page-break-after: always;
        }
</style>
