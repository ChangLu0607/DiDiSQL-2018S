/** 
*数据库操作辅助类,定义对象、数据操作方法都在这里定义 
*/ 
var dbname='websql';/*数据库名*/ 
var version = '1.0'; /*数据库版本*/ 
var dbdesc = 'websql练习'; /*数据库描述*/ 
var dbsize = 2*1024*1024; /*数据库大小*/ 
var dataBase = null; /*暂存数据库对象*/
var len = 0; /*数据库长度*/ 
/*数据库中的表单名*/ 
var websqlTable = "websqlTable"; 
 
/** 
 * 打开数据库 
 * @returns  dataBase:打开成功   null:打开失败 
 */ 
function websqlOpenDB(){ 
    /*数据库有就打开 没有就创建*/ 
    dataBase = window.openDatabase(dbname, version, dbdesc, dbsize,function() {}); 
    if (dataBase) { 
        alert("数据库创建/打开成功!"); 
    } else{ 
        alert("数据库创建/打开失败！"); 
    } 
    return dataBase; 
} 
/** 
 * 新建数据库里面的表单 
 * @param tableName:表单名 
 */ 
function websqlCreatTable(tableName){ 
//  chinaAreaOpenDB(); 
    var creatTableSQL = 'CREATE TABLE IF  NOT EXISTS '+ tableName + '(rowid INTEGER PRIMARY KEY AUTOINCREMENT, CPH text, CJH text, CLLX text, BZ text, CQ text, FPK text, CCS text, JQX text, SYX text, HJBXF text, GZS text, SPF text, XCJYF text, CZR text, HTQSSJ txt, HTDQSJ date, LXDH text, SFZH text, SR text, ZJ text)'; 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(creatTableSQL,[],function(ctx,result){ 
            //alert("表创建成功 " + tableName); 
        },function(tx, error){  
            alert('创建表失败:' + tableName + error.message); 
        }); 
    }); 
} 
/** 
 * 往表单里面插入数据 
 * @param tableName:表单名 
 * @param CPH:车牌号 以此类推 
 */ 
function websqlInsterDataToTable(tableName,CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ){ 
    var insterTableSQL = 'INSERT INTO ' + tableName + ' (CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	len=len+1;
        dataBase.transaction(function (ctx) { 
        ctx.executeSql(insterTableSQL,[CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ],function (ctx,result){ 
            alert("插入" + tableName  + CPH + "成功"); 
        }, 
        function (tx, error) { 
            alert('插入失败: ' + error.message); 
        }); 
    }); 
} 
/** 
 * 获取数据库一个表单里面的所有数据 
 * @param tableName:表单名 
 * 返回数据集合 
 */ 
function websqlGetAllData(tableName){    
    var selectALLSQL = 'SELECT * FROM ' + tableName; 
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectALLSQL,[],function (ctx,result){ 
            //alert('查询成功: ' + tableName + result.rows.length); 
            var len = result.rows.length; 
            for(var i = 0;i < len;i++) { 
                console.log("NAME = "  + result.rows.item(i).NAME); 
                console.log("AGE = "  + result.rows.item(i).AGE); 
                console.log("HEIGHT = "  + result.rows.item(i).HEIGHT); 
                console.log("WEIGTH = "  + result.rows.item(i).WEIGTH); 
                console.log("-------- 我是分割线 -------"); 
            } 
        }, 
        function (tx, error) { 
            alert('查询失败: ' + error.message); 
        }); 
    }); 
} 
/** 
 * 获取数据库一个表单里面的部分数据 
 * @param tableName:表单名 
 * @param name:姓名 
 */ 
function websqlGetAData(tableName,name){  
    $("#SearTblData").empty();
    $("#SearTblData").append(
	"<tr><th>查询结果：</th></tr><tr><td>序号</td><td>车牌号</td><td>车架号</td><td>车辆类型</td><td>备注</td><td>产权</td><td>发票款</td><td>车船税</td><td>交强险</td><td>商业险</td><td>合计保险费</td><td>购置税</td><td>上牌费</td><td>新车加油费</td><td>承租人</td><td>合同起始时间</td><td>合同到期时间</td><td>联系电话</td><td>身份证号</td><td>生日</td><td>租金（元/月）</td></tr>"
	)
    var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE CZR = ?' 
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectSQL,[name],function (ctx,result){ 
            var len = result.rows.length;
            if(len==0){
            alert('查询失败: ' + tableName + result.rows.length); 
		return false
		}
            //alert('查询成功: ' + tableName + result.rows.length); 
		for(var i = 0;i < len;i++) { 
                console.log("NAME = "  + result.rows.item(i).NAME);
                console.log("AGE = "  + result.rows.item(i).AGE); 
                console.log("HEIGHT = "  + result.rows.item(i).HEIGHT); 
                console.log("WEIGTH = "  + result.rows.item(i).WEIGTH);
                appendDataToTable(result.rows.item(i),$("#SearTblData"));//获取某行数据的json对象 
            } 
            
        },  
        function (tx, error) { 
            alert('查询失败: ' + error.message); 
        });
    }); 
} 
/** 
 * 删除表单里的全部数据 
 * @param tableName:表单名 
 */ 
function websqlDeleteAllDataFromTable(tableName){ 
    var deleteTableSQL = 'DELETE FROM ' + tableName; 
    localStorage.removeItem(tableName); 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(deleteTableSQL,[],function(ctx,result){ 
            alert("删除表成功 " + tableName); 
        },function(tx, error){  
            alert('删除表失败:' + tableName + error.message); 
        }); 
    }); 
} 
/** 
 * 根据ID删除数据 
 * @param tableName:表单名 
 * @param ID:数据的ID 
 */ 
function websqlDeleteADataFromTable(tableName,id){ 
    if(id=="all"){deleteAllData();}
    else{
    var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE rowid = ?'; 
    localStorage.removeItem(tableName); 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(deleteDataSQL,[id],function(ctx,result){ 
            alert("删除成功 " + tableName + id); 
        },function(tx, error){  
            alert('删除失败:' + tableName  + id + error.message); 
        }); 
    }); }
} 
/** 
 * 根据name修改数据 
 * @param tableName:表单名 
 * @param name:姓名 
 * @param age:年龄 
 */ 
function websqlUpdateAData(tableName,CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ,id){ 
    var updateDataSQL = 'UPDATE ' + tableName + ' SET CPH=?,CJH=?,CLLX=?,BZ=?,CQ=?,FPK=?,CCS=?,JQX=?,SYX=?,HJBXF=?,GZS=?,SPF=?,XCJYF=?,CZR=?,HTQSSJ=?,HTDQSJ=?,LXDH=?,SFZH=?,SR=?,ZJ=? WHERE rowid = ?'; 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(updateDataSQL,[CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ, id],function(ctx,result){ 
            alert("更新成功 " + tableName + name); 
        },function(tx, error){  
            alert('更新失败:' + tableName  + name + error.message); 
        }); 
    });
}
function showAllTheData(tableName){
    	$("#tblData").empty();
	$("#tblData").append(
	"<tr><th>查询结果：</th></tr><tr><td>序号</td><td>车牌号</td><td>车架号</td><td>车辆类型</td><td>备注</td><td>产权</td><td>发票款</td><td>车船税</td><td>交强险</td><td>商业险</td><td>合计保险费</td><td>购置税</td><td>上牌费</td><td>新车加油费</td><td>承租人</td><td>合同起始时间</td><td>合同到期时间</td><td>联系电话</td><td>身份证号</td><td>生日</td><td>租金（元/月）</td></tr>"
	)
	var selectALLSQL = 'SELECT * FROM ' + tableName; 
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectALLSQL,[],function (ctx,result){ 
            var len = result.rows.length; 
            for(var i = 0;i < len;i++) { 
                appendDataToTable(result.rows.item(i),$("#tblData"));//获取某行数据的json对象
            } 
        }, 
        function (tx, error) { 
            alert('查询失败: ' + error.message); 
        }); 
    }); 
} 
function appendDataToTable(data,locat) {//将数据展示到表格里面
            //uName,title,words
            var txtid = parseInt(data.rowid);
            var txtCPH = data.CPH;
            var txtCJH = data.CJH;
            var txtCLLX = data.CLLX;
            var txtBZ = data.BZ;
            var txtCQ = data.CQ;
            var txtFPK= data.FPK;
            var txtCCS= data.CCS;
            var txtJQX= data.JQX;
            var txtSYX= data.SYX;
            var txtHJBXF= data.HJBXF;
            var txtGZS= data.GZS;
            var txtSPF= data.SPF;
            var txtXCJYF= data.XCJYF;
            var txtCZR= data.CZR;
            var txtHTQSSJ= data.HTQSSJ;
            var txtHTDQSJ= data.HTDQSJ;
            var txtLXDH= data.LXDH;
            var txtSFZH= data.SFZH;
            var txtSR= data.SR;
            var txtZJ= data.ZJ;
  
            var strHtml = "";
            strHtml += "<tr>";
            strHtml += "<td>"+txtid+"</td>";            
            strHtml += "<td>"+txtCPH +"</td>";
            strHtml += "<td>" + txtCJH + "</td>";
            strHtml += "<td>" + txtCLLX + "</td>";
            strHtml += "<td>" + txtBZ + "</td>";
            strHtml += "<td>" + txtCQ + "</td>";
            strHtml += "<td>" + txtFPK + "</td>";
            strHtml += "<td>" + txtCCS + "</td>";
            strHtml += "<td>" + txtJQX + "</td>";
            strHtml += "<td>" + txtSYX + "</td>";
            strHtml += "<td>" + txtHJBXF + "</td>";
            strHtml += "<td>" + txtGZS + "</td>";
            strHtml += "<td>" + txtSPF + "</td>";
            strHtml += "<td>" + txtXCJYF + "</td>";
            strHtml += "<td>" + txtCZR + "</td>";
            strHtml += "<td>" + txtHTQSSJ + "</td>";
            strHtml += "<td>" + txtHTDQSJ + "</td>";
            strHtml += "<td>" + txtLXDH + "</td>";
            strHtml += "<td>" + txtSFZH + "</td>";
            strHtml += "<td>" + txtSR + "</td>";
            strHtml += "<td>" + txtZJ + "</td>";


            strHtml += '<td><input type="button" value="删除" class="btn" onclick="Deletthisrowid(this)"/></td>'; 
            strHtml += '<td><input type="button" value="修改" class="btn" onclick="Modifythisrowid(this)"/></td>';
            strHtml += "</tr>";
            locat.append(strHtml);
        }
/** 
 * 删除表单 
 * @param tableName:表单名 
 */ 
function websqlDeleteAllDataFromTable(tableName){ 
    var deleteTableSQL = 'drop table ' + tableName; 
    localStorage.removeItem(tableName); 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(deleteTableSQL,[],function(ctx,result){ 
            alert("删除表成功 " + tableName); 
        },function(tx, error){  
            alert('删除表失败:' + tableName + error.message); 
        }); 
    }); 
} 
/** 
 * 得到数据库中当前行id
 * @param tableName:按键id 
 */
function Getrowid(id){
	var rows = id.parentNode.parentNode.rowIndex;
	var table= id.parentNode.parentNode.parentNode.parentNode.id;
	var recId = document.getElementById(table).rows[rows].cells[0].innerHTML;
	return recId;
}
/** 
 * 删除当前行
 * @param tableName:按键id 
 */
function Deletthisrowid(id){
	websqlDeleteADataFromTable(websqlTable,Getrowid(id));
	showAllTheData(websqlTable);
	var searchname = document.getElementById("search_name").value 
        if(searchname){
        websqlGetAData(websqlTable,searchname); } 
}
/** 
 * 在修改栏显示当前行
 * @param tableName:按键id 
 */
function Modifythisrowid(id){
	websqlGetARow(websqlTable,Getrowid(id));
	showAllTheData(websqlTable);
 
}
/** 
 * 获取一行并显示在修改栏
 * @param tableName:表单名 
 * @param id：rowid
 */ 
function websqlGetARow(tableName,id){  
    
    var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE rowid = ?' 
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectSQL,[id],function (ctx,result){ 
            var len = result.rows.length;
            if(len==0){
            alert('查询失败: ' + tableName + result.rows.length); 
		return false
		}
            //alert('查询成功: ' + tableName + result.rows.length); 
		for(var i = 0;i < len;i++) { 
                appendDataToMod(result.rows.item(i));//获取某行数据的json对象 
            } 
            
        },  
        function (tx, error) { 
            alert('查询失败: ' + error.message); 
        });
    }); 
}
/** 
 * 将数据展示到修改栏
 * @param tableName:表单名 
 * @param id：rowid
 */ 
function appendDataToMod(data) {
            //uName,title,words
            var txtid = parseInt(data.rowid);
            var txtCPH = data.CPH;
            var txtCJH = data.CJH;
            var txtCLLX = data.CLLX;
            var txtBZ = data.BZ;
            var txtCQ = data.CQ;
            var txtFPK = data.FPK;
            var txtCCS = data.CCS;
            var txtJQX = data.JQX;
            var txtSYX = data.SYX;
            var txtHJBXF = data.HJBXF;
            var txtGZS = data.GZS;
            var txtSPF = data.SPF;
            var txtXCJYF = data.XCJYF;
            var txtCZR = data.CZR;
            var txtHTQSSJ = data.HTQSSJ;
            var txtHTDQSJ = data.HTDQSJ;
            var txtLXDH = data.LXDH;
            var txtSFZH = data.SFZH;
            var txtSR = data.SR;
            var txtZJ = data.ZJ;
            document.getElementById("xh").value=txtid; 
            document.getElementById("mcph").value=txtCPH 
            document.getElementById("mcjh").value=txtCJH 
            document.getElementById("mcllx").value=txtCLLX 
            document.getElementById("mbz").value=txtBZ 
            document.getElementById("mcq").value=txtCQ 
            document.getElementById("mfpk").value=txtFPK
            document.getElementById("mccs").value=txtCCS 
            document.getElementById("mjqx").value=txtJQX 
            document.getElementById("msyx").value=txtSYX 
            document.getElementById("mhjbxf").value=txtHJBXF 
            document.getElementById("mgzs").value=txtGZS 
            document.getElementById("mspf").value=txtSPF 
            document.getElementById("mxcjyf").value=txtXCJYF 
            document.getElementById("mczr").value=txtCZR 
            document.getElementById("mhtqssj").value=txtHTQSSJ 
            document.getElementById("mhtdqsj").value=txtHTDQSJ 
            document.getElementById("mlxdh").value=txtLXDH 
            document.getElementById("msfzh").value=txtSFZH 
            document.getElementById("msr").value=txtSR 
            document.getElementById("mzj").value=txtZJ 
        }
/** 
 * 获取当前时间
 */
function getnow()

{

  var now= new Date();

  var year=now.getFullYear();

  var month=now.getMonth();

  var date=now.getDate();

//写入相应id

return {Year:year,Month:month,Day:date}


}
/** 
 * 获取时间
 */
function gettime(date)

{

  var year=date.getFullYear();

  var month=date.getMonth();

  var day=date.getDate();
  var D=year

//写入相应id

  
}  
/** 
 * 获得快到期司机名单
 */
function websqlGetExp(tableName){  
    $("#exptbl").empty();
    $("#exptbl").append(
	"<tr><th>查询结果：</th></tr><tr><td>序号</td><td>车牌号</td><td>车架号</td><td>车辆类型</td><td>备注</td><td>产权</td><td>发票款</td><td>车船税</td><td>交强险</td><td>商业险</td><td>合计保险费</td><td>购置税</td><td>上牌费</td><td>新车加油费</td><td>承租人</td><td>合同起始时间</td><td>合同到期时间</td><td>联系电话</td><td>身份证号</td><td>生日</td><td>租金（元/月）</td></tr>"
	)
    var selectSQL = 'SELECT * FROM ' + tableName
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectSQL,[],function (ctx,result){ 
            var len = result.rows.length;
		for(var i = 0;i < len;i++) { 
                var d   =   new   Date(result.rows.item(i).HTDQSJ.replace(/-/g,   "/"));
                var now = new Date();
                var remain = d.getTime()-now.getTime();
                var remainday = Math.floor(remain/(24*3600*1000));
		if (remainday <=5 && remainday >=0){
                appendDataToTable(result.rows.item(i),$("#exptbl"))
                }
            } 
            
        },  
        function (tx, error) { 
            alert('查询失败: ' + error.message); 
        });
    }); 
} 

/** 
 * 获得已过期司机名单
 */
function websqlGetLate(tableName){  
    $("#latetbl").empty();
    $("#latetbl").append(
	"<tr><th>查询结果：</th></tr><tr><td>序号</td><td>车牌号</td><td>车架号</td><td>车辆类型</td><td>备注</td><td>产权</td><td>发票款</td><td>车船税</td><td>交强险</td><td>商业险</td><td>合计保险费</td><td>购置税</td><td>上牌费</td><td>新车加油费</td><td>承租人</td><td>合同起始时间</td><td>合同到期时间</td><td>联系电话</td><td>身份证号</td><td>生日</td><td>租金（元/月）</td></tr>"
	)
    var selectSQL = 'SELECT * FROM ' + tableName
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectSQL,[],function (ctx,result){ 
            var len = result.rows.length;
		for(var i = 0;i < len;i++) { 
                var d   =   new   Date(result.rows.item(i).HTDQSJ.replace(/-/g,   "/"));
                var now = new Date();
                var remain = d.getTime()-now.getTime();
                var remainday = Math.floor(remain/(24*3600*1000));
		if (remainday <0){
                appendDataToTable(result.rows.item(i),$("#latetbl"))
                }
            } 
            
        },  
        function (tx, error) { 
            alert('查询失败: ' + error.message); 
        });
    }); 
}
/** 
 * 刷新提醒
 */
function alertlate(){
	websqlGetExp(websqlTable);
	websqlGetLate(websqlTable);
	} 
/** 
 * 清空插入表格
 */
function clearMData(){
            document.getElementById("xh").value=null; 
            document.getElementById("mcph").value=null
            document.getElementById("mcjh").value=null
            document.getElementById("mcllx").value=null
            document.getElementById("mbz").value=null
            document.getElementById("mcq").value=null
            document.getElementById("mfpk").value=null
            document.getElementById("mccs").value=null
            document.getElementById("mjqx").value=null
            document.getElementById("msyx").value=null
            document.getElementById("mhjbxf").value=null
            document.getElementById("mgzs").value=null
            document.getElementById("mspf").value=null
            document.getElementById("mxcjyf").value=null
            document.getElementById("mczr").value=null
            document.getElementById("mhtqssj").value=null
            document.getElementById("mhtdqsj").value=null
            document.getElementById("mlxdh").value=null
            document.getElementById("msfzh").value=null
            document.getElementById("msr").value=null
            document.getElementById("mzj").value=null
	} 
/** 
 * 清空修改表格
 */
function clearData(){
            document.getElementById("cph").value=null
            document.getElementById("cjh").value=null
            document.getElementById("cllx").value=null
            document.getElementById("bz").value=null
            document.getElementById("cq").value=null
            document.getElementById("fpk").value=null
            document.getElementById("ccs").value=null
            document.getElementById("jqx").value=null
            document.getElementById("syx").value=null
            document.getElementById("hjbxf").value=null
            document.getElementById("gzs").value=null
            document.getElementById("spf").value=null
            document.getElementById("xcjyf").value=null
            document.getElementById("czr").value=null
            document.getElementById("htqssj").value=null
            document.getElementById("htdqsj").value=null
            document.getElementById("lxdh").value=null
            document.getElementById("sfzh").value=null
            document.getElementById("sr").value=null
            document.getElementById("zj").value=null
	} 