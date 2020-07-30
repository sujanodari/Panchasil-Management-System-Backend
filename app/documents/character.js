module.exports = ({
  name,
  parentName,
  address,
  wardNo,
  dateFrom,
  dateTo,
  heldYear,
  grade,
  seeReg,
  seeSymbol,
  dob,
}) => {
  const today = new Date();
  return `
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>A simple, clean, and responsive HTML invoice template</title>
    
    <style>
    .character {
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
        .character table {
        width: 100%;
        line-height: inherit;
        text-align: center;
    }
        .character table td {
        padding: 5px;
        vertical-align: top;
        
    }
        .aa{
            margin-top: 100px;
            
        }
    
       
        .character h2{
            text-align: center;
            color: #005aa9;
        }
        .character p{
            margin-top: 20px;
            text-align: justify;
        }
        .character .div p{
            text-align: center
        }
       
    </style>
</head>

<body>
    <div class="character">
    <table class="table"><td>
             <img src="https://softwarica.edu.np/wp-content/uploads/2019/01/cropped-Softwarica-logo.png" style="width:100%; max-width:300px;">
        </td></table>
             <h2 class="h2">CHARACTER CERTIFICATE</h2>
         
       
        <div>
    
            <p class="p">This is to certify that Mr./Ms.  <b style="color:gray;text-transform: uppercase;">${name}</b> <br> 
            Son/Daughter of Mr./Mrs.   <b style="color:gray;text-transform: uppercase;"> ${parentName}</b>  <br>
            inhabitant of <b style="color:gray;text-transform: uppercase;"> ${address}</b>  VDC/Municipality/Metropolitan city ward no. <b style="color:gray;text-transform: uppercase;">${wardNo}</b> , 
            had been studying in this School from <b style="color:gray;">${dateFrom}</b>  to <b style="color:gray;">${dateTo}</b>  AD. s/he passed 
            the Secondary Education Examination (SEE) examination held in <b style="color:gray;">${heldYear}</b>  in <b style="color:gray;text-transform: uppercase;">${grade}</b>  Grade.
            S/he is hardworking, sincere and obedient student. I found nothing against her/his
            character during this period.</p>
            
            <p class="p">
            We wish all the best for her/his bright future.
            </p>
            
            <p class="p">
             Name: - <b style="color:gray;text-transform: uppercase;">${name}</b> <br>
             SEE Regd. No: - <b style="color:gray;text-transform: uppercase;">${seeReg}</b>  <br>
             SEE Symbol No: - <b style="color:gray;text-transform: uppercase;">${seeSymbol}</b>  <br>
             Date of Birth: - <b style="color:gray;">${dob}</b> 
            </p>
            
            
            
           <table class="aa">
              
               <td class="td">
                ...................................<br>
               Prepared by <br>
               Signature
               </td>
               
                <td class="td">
                ...................................<br>
               Checked by <br>
               Signature
               </td>
               
               <td class="td">
                ...................................<br>
                Principal <br>
               Signature
               </td>
            </table>
            
            
             
            <table>
           <hr>
               <td class="td">Data of issue: - ${`${today.getDate()}/${
                 today.getMonth() + 1
               }/${today.getFullYear()}`}</td>
              
            </table>
         
            
        </div>
        
    </div>
    
</body>
</html>

`;
};
