module.exports = ({
    fullName,
    totalInvoice,
    feePaid,
    lastdue,
    grade,
    section,
  }) => {
    const today = new Date();
    return `
  <!doctype html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>A simple, clean, and responsive HTML invoice template</title>
      
      <style>
      .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, .15);
          font-size: 16px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
      }
      
      .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
      }
      
      .invoice-box table td {
          padding: 5px;
          vertical-align: top;
      }
      
      .invoice-box table tr td:nth-child(2) {
          text-align: right;
      }
      
      .invoice-box table tr.top table td {
          padding-bottom: 20px;
      }
      
      .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
      }
      
      .invoice-box table tr.information table td {
          padding-bottom: 40px;
      }
      
      .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
      }
      
      .invoice-box table tr.details td {
          padding-bottom: 20px;
      }
      
      .invoice-box table tr.item td{
          border-bottom: 1px solid #eee;
      }
      
      .invoice-box table tr.item.last td {
          border-bottom: none;
      }
      
      .invoice-box table tr.total td:nth-child(2) {
          border-top: 2px solid #eee;
          font-weight: bold;
      }
      
      @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
              width: 100%;
              display: block;
              text-align: center;
          }
          
          .invoice-box table tr.information table td {
              width: 100%;
              display: block;
              text-align: center;
          }
      }
      
      /** RTL **/
      .rtl {
          direction: rtl;
          font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      }
      
      .rtl table {
          text-align: right;
      }
      
      .rtl table tr td:nth-child(2) {
          text-align: left;
      }
      </style>
  </head>
  
  <body>
      <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
              <tr class="top">
                  <td colspan="2">
                      <table>
                          <tr>
                          <td class="title"><img  src="https://softwarica.edu.np/wp-content/uploads/2019/01/cropped-Softwarica-logo.png?fit=1000%2C600&ssl=1"
                          style="width:100%; max-width:156px;"></td>    
                          
                              
                              <td>
                                  <h2>Fee Clearance</h2><br>
                                  Date: ${`${today.getDate()}/${
                                    today.getMonth() + 1
                                  }/${today.getFullYear()}`}
                                 
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              
              <tr class="information">
                  <td colspan="2">
                      <table>
                          <tr>
                          <td>
                          Student Name: ${fullName}<br>
                          Class: ${grade}<br>
                          Section: ${section}
                       </td>
                       
                                  
                      
                          </tr>
                      </table>
                  </td>
              </tr>
              
              
              
              <tr class="heading">
                  <td>
                      S.No. Particulars
                  </td>
                  
                  <td>
                     Amount
                  </td>
              </tr>
              
              <tr class="item">
                  <td>
                     Total Invoice
                  </td>
                  
                  <td>
                  Rs. ${totalInvoice}
                  </td>
                  
              </tr>
              
              <tr class="item">
                  <td>
                 Fee Paid
                  </td>
                  
                  <td>
                  Rs. ${feePaid}
                  </td>
                  
              </tr>
  
             
              
              
              
              <tr class="total">
                  <td></td>
                 
                  <td>
                   Remaining Fee: Rs. ${
                       parseInt(totalInvoice) -
                       parseInt(feePaid)
                       
                     }
                  </td>
                 
              </tr>
          </table>
          <div>
          <h4>Notes</h4>
          <p>Thank you; We really look forward to helping your children grow</p>
         
      </div>
      </div>
  </body>
  </html>
  
     
      `;
  };
  