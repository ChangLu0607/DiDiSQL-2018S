/** 
*���ݿ����������,����������ݲ��������������ﶨ�� 
*/ 
var dbname='websql';/*���ݿ���*/ 
var version = '1.0'; /*���ݿ�汾*/ 
var dbdesc = 'websql��ϰ'; /*���ݿ�����*/ 
var dbsize = 2*1024*1024; /*���ݿ��С*/ 
var dataBase = null; /*�ݴ����ݿ����*/
var len = 0; /*���ݿⳤ��*/ 
/*���ݿ��еı���*/ 
var websqlTable = "websqlTable"; 
 
/** 
 * �����ݿ� 
 * @returns  dataBase:�򿪳ɹ�   null:��ʧ�� 
 */ 
function websqlOpenDB(){ 
    /*���ݿ��оʹ� û�оʹ���*/ 
    dataBase = window.openDatabase(dbname, version, dbdesc, dbsize,function() {}); 
    if (dataBase) { 
        alert("���ݿⴴ��/�򿪳ɹ�!"); 
    } else{ 
        alert("���ݿⴴ��/��ʧ�ܣ�"); 
    } 
    return dataBase; 
} 
/** 
 * �½����ݿ�����ı� 
 * @param tableName:���� 
 */ 
function websqlCreatTable(tableName){ 
//  chinaAreaOpenDB(); 
    var creatTableSQL = 'CREATE TABLE IF  NOT EXISTS '+ tableName + '(rowid INTEGER PRIMARY KEY AUTOINCREMENT, CPH text, CJH text, CLLX text, BZ text, CQ text, FPK text, CCS text, JQX text, SYX text, HJBXF text, GZS text, SPF text, XCJYF text, CZR text, HTQSSJ txt, HTDQSJ date, LXDH text, SFZH text, SR text, ZJ text)'; 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(creatTableSQL,[],function(ctx,result){ 
            //alert("�����ɹ� " + tableName); 
        },function(tx, error){  
            alert('������ʧ��:' + tableName + error.message); 
        }); 
    }); 
} 
/** 
 * ��������������� 
 * @param tableName:���� 
 * @param CPH:���ƺ� �Դ����� 
 */ 
function websqlInsterDataToTable(tableName,CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ){ 
    var insterTableSQL = 'INSERT INTO ' + tableName + ' (CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	len=len+1;
        dataBase.transaction(function (ctx) { 
        ctx.executeSql(insterTableSQL,[CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ],function (ctx,result){ 
            alert("����" + tableName  + CPH + "�ɹ�"); 
        }, 
        function (tx, error) { 
            alert('����ʧ��: ' + error.message); 
        }); 
    }); 
} 
/** 
 * ��ȡ���ݿ�һ����������������� 
 * @param tableName:���� 
 * �������ݼ��� 
 */ 
function websqlGetAllData(tableName){    
    var selectALLSQL = 'SELECT * FROM ' + tableName; 
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectALLSQL,[],function (ctx,result){ 
            //alert('��ѯ�ɹ�: ' + tableName + result.rows.length); 
            var len = result.rows.length; 
            for(var i = 0;i < len;i++) { 
                console.log("NAME = "  + result.rows.item(i).NAME); 
                console.log("AGE = "  + result.rows.item(i).AGE); 
                console.log("HEIGHT = "  + result.rows.item(i).HEIGHT); 
                console.log("WEIGTH = "  + result.rows.item(i).WEIGTH); 
                console.log("-------- ���Ƿָ��� -------"); 
            } 
        }, 
        function (tx, error) { 
            alert('��ѯʧ��: ' + error.message); 
        }); 
    }); 
} 
/** 
 * ��ȡ���ݿ�һ��������Ĳ������� 
 * @param tableName:���� 
 * @param name:���� 
 */ 
function websqlGetAData(tableName,name){  
    $("#SearTblData").empty();
    $("#SearTblData").append(
	"<tr><th>��ѯ�����</th></tr><tr><td>���</td><td>���ƺ�</td><td>���ܺ�</td><td>��������</td><td>��ע</td><td>��Ȩ</td><td>��Ʊ��</td><td>����˰</td><td>��ǿ��</td><td>��ҵ��</td><td>�ϼƱ��շ�</td><td>����˰</td><td>���Ʒ�</td><td>�³����ͷ�</td><td>������</td><td>��ͬ��ʼʱ��</td><td>��ͬ����ʱ��</td><td>��ϵ�绰</td><td>���֤��</td><td>����</td><td>���Ԫ/�£�</td></tr>"
	)
    var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE CZR = ?' 
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectSQL,[name],function (ctx,result){ 
            var len = result.rows.length;
            if(len==0){
            alert('��ѯʧ��: ' + tableName + result.rows.length); 
		return false
		}
            //alert('��ѯ�ɹ�: ' + tableName + result.rows.length); 
		for(var i = 0;i < len;i++) { 
                console.log("NAME = "  + result.rows.item(i).NAME);
                console.log("AGE = "  + result.rows.item(i).AGE); 
                console.log("HEIGHT = "  + result.rows.item(i).HEIGHT); 
                console.log("WEIGTH = "  + result.rows.item(i).WEIGTH);
                appendDataToTable(result.rows.item(i),$("#SearTblData"));//��ȡĳ�����ݵ�json���� 
            } 
            
        },  
        function (tx, error) { 
            alert('��ѯʧ��: ' + error.message); 
        });
    }); 
} 
/** 
 * ɾ�������ȫ������ 
 * @param tableName:���� 
 */ 
function websqlDeleteAllDataFromTable(tableName){ 
    var deleteTableSQL = 'DELETE FROM ' + tableName; 
    localStorage.removeItem(tableName); 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(deleteTableSQL,[],function(ctx,result){ 
            alert("ɾ����ɹ� " + tableName); 
        },function(tx, error){  
            alert('ɾ����ʧ��:' + tableName + error.message); 
        }); 
    }); 
} 
/** 
 * ����IDɾ������ 
 * @param tableName:���� 
 * @param ID:���ݵ�ID 
 */ 
function websqlDeleteADataFromTable(tableName,id){ 
    if(id=="all"){deleteAllData();}
    else{
    var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE rowid = ?'; 
    localStorage.removeItem(tableName); 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(deleteDataSQL,[id],function(ctx,result){ 
            alert("ɾ���ɹ� " + tableName + id); 
        },function(tx, error){  
            alert('ɾ��ʧ��:' + tableName  + id + error.message); 
        }); 
    }); }
} 
/** 
 * ����name�޸����� 
 * @param tableName:���� 
 * @param name:���� 
 * @param age:���� 
 */ 
function websqlUpdateAData(tableName,CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ,id){ 
    var updateDataSQL = 'UPDATE ' + tableName + ' SET CPH=?,CJH=?,CLLX=?,BZ=?,CQ=?,FPK=?,CCS=?,JQX=?,SYX=?,HJBXF=?,GZS=?,SPF=?,XCJYF=?,CZR=?,HTQSSJ=?,HTDQSJ=?,LXDH=?,SFZH=?,SR=?,ZJ=? WHERE rowid = ?'; 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(updateDataSQL,[CPH,CJH,CLLX,BZ,CQ,FPK,CCS,JQX,SYX,HJBXF,GZS,SPF,XCJYF,CZR,HTQSSJ,HTDQSJ,LXDH,SFZH,SR,ZJ, id],function(ctx,result){ 
            alert("���³ɹ� " + tableName + name); 
        },function(tx, error){  
            alert('����ʧ��:' + tableName  + name + error.message); 
        }); 
    });
}
function showAllTheData(tableName){
    	$("#tblData").empty();
	$("#tblData").append(
	"<tr><th>��ѯ�����</th></tr><tr><td>���</td><td>���ƺ�</td><td>���ܺ�</td><td>��������</td><td>��ע</td><td>��Ȩ</td><td>��Ʊ��</td><td>����˰</td><td>��ǿ��</td><td>��ҵ��</td><td>�ϼƱ��շ�</td><td>����˰</td><td>���Ʒ�</td><td>�³����ͷ�</td><td>������</td><td>��ͬ��ʼʱ��</td><td>��ͬ����ʱ��</td><td>��ϵ�绰</td><td>���֤��</td><td>����</td><td>���Ԫ/�£�</td></tr>"
	)
	var selectALLSQL = 'SELECT * FROM ' + tableName; 
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectALLSQL,[],function (ctx,result){ 
            var len = result.rows.length; 
            for(var i = 0;i < len;i++) { 
                appendDataToTable(result.rows.item(i),$("#tblData"));//��ȡĳ�����ݵ�json����
            } 
        }, 
        function (tx, error) { 
            alert('��ѯʧ��: ' + error.message); 
        }); 
    }); 
} 
function appendDataToTable(data,locat) {//������չʾ���������
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


            strHtml += '<td><input type="button" value="ɾ��" class="btn" onclick="Deletthisrowid(this)"/></td>'; 
            strHtml += '<td><input type="button" value="�޸�" class="btn" onclick="Modifythisrowid(this)"/></td>';
            strHtml += "</tr>";
            locat.append(strHtml);
        }
/** 
 * ɾ���� 
 * @param tableName:���� 
 */ 
function websqlDeleteAllDataFromTable(tableName){ 
    var deleteTableSQL = 'drop table ' + tableName; 
    localStorage.removeItem(tableName); 
    dataBase.transaction(function (ctx,result) { 
        ctx.executeSql(deleteTableSQL,[],function(ctx,result){ 
            alert("ɾ����ɹ� " + tableName); 
        },function(tx, error){  
            alert('ɾ����ʧ��:' + tableName + error.message); 
        }); 
    }); 
} 
/** 
 * �õ����ݿ��е�ǰ��id
 * @param tableName:����id 
 */
function Getrowid(id){
	var rows = id.parentNode.parentNode.rowIndex;
	var table= id.parentNode.parentNode.parentNode.parentNode.id;
	var recId = document.getElementById(table).rows[rows].cells[0].innerHTML;
	return recId;
}
/** 
 * ɾ����ǰ��
 * @param tableName:����id 
 */
function Deletthisrowid(id){
	websqlDeleteADataFromTable(websqlTable,Getrowid(id));
	showAllTheData(websqlTable);
	var searchname = document.getElementById("search_name").value 
        if(searchname){
        websqlGetAData(websqlTable,searchname); } 
}
/** 
 * ���޸�����ʾ��ǰ��
 * @param tableName:����id 
 */
function Modifythisrowid(id){
	websqlGetARow(websqlTable,Getrowid(id));
	showAllTheData(websqlTable);
 
}
/** 
 * ��ȡһ�в���ʾ���޸���
 * @param tableName:���� 
 * @param id��rowid
 */ 
function websqlGetARow(tableName,id){  
    
    var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE rowid = ?' 
    dataBase.transaction(function (ctx) { 
        ctx.executeSql(selectSQL,[id],function (ctx,result){ 
            var len = result.rows.length;
            if(len==0){
            alert('��ѯʧ��: ' + tableName + result.rows.length); 
		return false
		}
            //alert('��ѯ�ɹ�: ' + tableName + result.rows.length); 
		for(var i = 0;i < len;i++) { 
                appendDataToMod(result.rows.item(i));//��ȡĳ�����ݵ�json���� 
            } 
            
        },  
        function (tx, error) { 
            alert('��ѯʧ��: ' + error.message); 
        });
    }); 
}
/** 
 * ������չʾ���޸���
 * @param tableName:���� 
 * @param id��rowid
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
 * ��ȡ��ǰʱ��
 */
function getnow()

{

  var now= new Date();

  var year=now.getFullYear();

  var month=now.getMonth();

  var date=now.getDate();

//д����Ӧid

return {Year:year,Month:month,Day:date}


}
/** 
 * ��ȡʱ��
 */
function gettime(date)

{

  var year=date.getFullYear();

  var month=date.getMonth();

  var day=date.getDate();
  var D=year

//д����Ӧid

  
}  
/** 
 * ��ÿ쵽��˾������
 */
function websqlGetExp(tableName){  
    $("#exptbl").empty();
    $("#exptbl").append(
	"<tr><th>��ѯ�����</th></tr><tr><td>���</td><td>���ƺ�</td><td>���ܺ�</td><td>��������</td><td>��ע</td><td>��Ȩ</td><td>��Ʊ��</td><td>����˰</td><td>��ǿ��</td><td>��ҵ��</td><td>�ϼƱ��շ�</td><td>����˰</td><td>���Ʒ�</td><td>�³����ͷ�</td><td>������</td><td>��ͬ��ʼʱ��</td><td>��ͬ����ʱ��</td><td>��ϵ�绰</td><td>���֤��</td><td>����</td><td>���Ԫ/�£�</td></tr>"
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
            alert('��ѯʧ��: ' + error.message); 
        });
    }); 
} 

/** 
 * ����ѹ���˾������
 */
function websqlGetLate(tableName){  
    $("#latetbl").empty();
    $("#latetbl").append(
	"<tr><th>��ѯ�����</th></tr><tr><td>���</td><td>���ƺ�</td><td>���ܺ�</td><td>��������</td><td>��ע</td><td>��Ȩ</td><td>��Ʊ��</td><td>����˰</td><td>��ǿ��</td><td>��ҵ��</td><td>�ϼƱ��շ�</td><td>����˰</td><td>���Ʒ�</td><td>�³����ͷ�</td><td>������</td><td>��ͬ��ʼʱ��</td><td>��ͬ����ʱ��</td><td>��ϵ�绰</td><td>���֤��</td><td>����</td><td>���Ԫ/�£�</td></tr>"
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
            alert('��ѯʧ��: ' + error.message); 
        });
    }); 
}
/** 
 * ˢ������
 */
function alertlate(){
	websqlGetExp(websqlTable);
	websqlGetLate(websqlTable);
	} 
/** 
 * ��ղ�����
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
 * ����޸ı��
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