var result=[];for(var i in secAreaID){for(var j in secAreaID[i]){result.push("http://vote.2018.nat.gov.tw/pc/zh_TW/PV/"+secAreaID[i][j]+"0000000.html");}}
var record=[]
window["area"]=[];

for(var i in result){fetch(result[i])
  .then(function(response) {
    return response.text();
  })
  .then(function(html) {
    var parser = new DOMParser(); var doc = parser.parseFromString(html, "text/html");
var tables = doc.querySelectorAll("table");
//window["area"].push(tables[3].querySelectorAll("td")[1].innerText);
var area=tables[3].querySelectorAll("td")[1].innerText;

var data = tables[4].querySelectorAll("tr");
var item = {"area":area,"result":[]};
     for(var d in data){
         
        var td = data[d].querySelectorAll("td");
           
           if(td.length==3 && td[0].innerText!="政黨" ){
                  item["result"].push({"area":area,"party":td[0].innerText,"votes":parseFloat(td[1].innerText),"ratio":td[2].innerText.replace("%","")});
                  console.log(item);
            }
         if(record.indexOf(area)==-1){window["area"].push(item);record.push(area); }
     }


  });}

