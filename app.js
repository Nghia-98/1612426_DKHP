var dataController = (function() {
    var Subject = function(id, name) {
        this.id = id;
        this.name = name;
        this.status = 1;
    };
    
    var Student = function(id, mssv, name, gender, birthDay, allSubject) {
        var arr_regisList = [];
        this.id = id;
        this.mssv = mssv;
        this.name = name;
        this.gender = gender;
        this.birthDay = birthDay;
        allSubject.forEach(function(cur_element, index, arr) {
            if(cur_element.status === 3) arr_regisList.push(cur_element)
        })
        this.regisList = arr_regisList;
    };
    
    var data = {
        allStudent: [],
        allSubject: [],
    };
    
    return {
        addStudentIntoData: function(mssv, name, gender, birthDay, allSubject) {
            var newStudent, ID;
            
            //Create newId for student
            if (data.allStudent.length > 0) {
                ID = data.allStudent[data.allStudent.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            newStudent = new Student(ID, mssv, name, gender, birthDay, allSubject);
            data.allStudent.push(newStudent);
        },
        
        addSubject: function(name) {
            var newSubject, ID;
            
             //Create newId for Subject
            if (data.allSubject.length > 0) {
                ID = data.allSubject[data.allSubject.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            newSubject = new Subject(ID, name);
            data.allSubject.push(newSubject);
        },
        
        updateDataWhenSelectSubj: function(id) {
            
            console.log('updateDataWhenSelectSubj')
            console.log(data);
            var oldStatus, newStatus;
            
            oldStatus = data.allSubject[id].status;
            
            if (oldStatus === 1) newStatus = 2;
            if (oldStatus === 2) newStatus = 1;
            if (oldStatus === 3) newStatus = 4;
            if (oldStatus === 4) newStatus = 3;
            
            data.allSubject[id].status = newStatus;
           
        },
        
        updateSubjOnDataWhenPushEach: function() {
            data.allSubject.forEach(function(cur_subj, index, arrSubj) {
                if (data.allSubject[index].status === 2) data.allSubject[index].status = 3;
                else if (data.allSubject[index].status === 4) data.allSubject[index].status = 3;
            });
        },
        
        updateSubjOnDataWhenPushAll: function() {
            data.allSubject.forEach(function(cur_subj, index, arrSubj) {
               data.allSubject[index].status = 3;
            });
        },
        
        updateSubjOnDataWhenPopEach: function() {
            data.allSubject.forEach(function(cur_subj, index, arrSubj) {
                if (data.allSubject[index].status === 2) data.allSubject[index].status = 1;
                else if (data.allSubject[index].status === 4) data.allSubject[index].status = 1;
            });
        },
        
        updateSubjOnDataWhenPopAll: function() {
            data.allSubject.forEach(function(cur_subj, index, arrSubj) {
               data.allSubject[index].status = 1;
            });
        },
        
        resetData: function() {
          data.allSubject.forEach(function(cur_subj, index, arr_subj) {
              data.allSubject[index].status = 1;
          })  
        },
        
        getData: function() {
            return data;
        },
        
    };
    
    
    
}) ();


var UIController = (function() {
    
    var getGender = function() {
        
        var name, nu, txt = "";
        nam = document.getElementById('nam');
        nu = document.getElementById('nu');
        if (nam.checked) txt = 'Nam';
        if (nu.checked) txt = 'Nữ';
        return txt;
    };
    
    var getBirthDate = function() {
         
        var day, month, year, birthDate = "";
        day = document.getElementById('date').value;
        month = document.getElementById('month').value;
        year = document.getElementById('year').value;
        birthDate = day + '/' + month + '/' + year;
        return birthDate;
    };
    
    var showEachSubj = function(subj) {
        
        var html, newHtml, element;
        // 1. Create html string placehoder
        html = `<div class="item">
                    <p id="%id%">%SubjName%</p>
                </div>`;
         //2. Replace the placeholder text with some actual data 
        newHtml = html.replace("%id%", subj.id);
        newHtml = newHtml.replace("%SubjName%", subj.name);
        
        // 3. Insert the html into the DOM
        if (subj.status === 1 ) {
            element = document.querySelector('.subjects');
        } else if (subj.status === 3) {
             element = document.querySelector('.registered');
        } 
        
        element.insertAdjacentHTML("beforeend", newHtml);
    };
    
    var showEachStudent = function(student) {
        var html, newHtml;
        // 1. Create html string placehoder
        html =  `
                    <tr id ="%id%">
                        <td>%maSo%</td>
                        <td>%hoTen%</td>
                        <td>%gioiTinh%</td>
                        <td>%ngaySinh%</td>
                    </tr>
                    
                    
                 `;
        
        //2. Replace the placeholder text with some actual data 
        newHtml = html.replace("%maSo%", student.mssv);
        newHtml = newHtml.replace("%hoTen%", student.name);
        newHtml = newHtml.replace("%gioiTinh%", student.gender);
        newHtml = newHtml.replace("%ngaySinh%", student.birthDay);
        newHtml = newHtml.replace("%id%", student.id);
        
         // 3. Insert the html into the DOM
        document.querySelector('.table').insertAdjacentHTML("beforeend", newHtml);
    };
    
    var clearAllStudentOnTheUI = function() {
        var tableHeader;
        tableHeader =   `<tr>
                            <th>Mã số</th> 
                            <th>Họ tên</th> 
                            <th>Giới tính</th> 
                            <th>Ngày sinh</th>
                        </tr>`
        document.querySelector('.table').innerHTML = tableHeader;
    }
    
    
 
    return {
        
        getInput: function() {
           
            return {
                maSo: document.getElementById('maSo').value,
                hoTen: document.getElementById('hoTen').value,
                gioiTinh: getGender(), 
                birthDate: getBirthDate(),
            };
        },
        
        
        showAllSubject: function(data) {
            data.allSubject.forEach(function(cur_subj, index, arrSubj) {
                showEachSubj(cur_subj);
            });
            
        },
        
        showAllStudentOnTheUI: function(data) {
            clearAllStudentOnTheUI();
            data.allStudent.forEach(function(cur_student) {
                showEachStudent(cur_student);
            })
        },
        
        updateColorWhenSelectSubj: function(id, status) {
            var el;
            if (status === 2 || status === 4) {
                el = document.getElementById(id).classList.add('subjSelected');
            }
            else el = document.getElementById(id).classList.remove('subjSelected');
        },
        
       /* updateSubjOnTheUI: function(obj) {
            obj.allSubject.forEach(function(cur_subj, index, arr_subj) {
                var html, newHtml, element;
                
                // 1. Create html string placehoder
                html = `<div class="item">
                            <p id="%id%">%SubjName%</p>
                        </div>`;
                
                //2. Replace the placeholder text with some actual data 
                newHtml = html.replace("%id%", cur_subj.id);
                newHtml = newHtml.replace("%SubjName%", cur_subj.name);
                
                if (cur_subj.status === 1) {
                    el = document.querySelector('.subjects');
                   
                } 
                else if (cur_subj.status === 2 || cur_subj.status === 3 || cur_subj.status === 4) {
                    el = document.querySelector('.registered');
                }
                
                el.insertAdjacentHTML('beforeend', newHtml);
            });
        }, */
        
        clearFiled: function() {
            document.querySelector('.subjects').textContent = '';
            document.querySelector('.registered').textContent = '';
        },
        
        resetUI: function(data) {
            document.querySelector('.subjects').textContent = '';
            document.querySelector('.registered').textContent = '';
            data.allSubject.forEach(function(cur_subj, index, arrSubj) {
                showEachSubj(cur_subj);
            });
            
            document.getElementById('maSo').value = "";
            document.getElementById('hoTen').value = "";
            document.getElementById('nam').checked = false;
            document.getElementById('nu').checked = false;
            
            document.getElementById('date').selectedIndex  = 0;
            document.getElementById('month').selectedIndex = 0;
            document.getElementById('year').selectedIndex = 0;
        },
        
        showListDetail: function(data) {
            if (data.allStudent.length > 0) {
                
                data.allStudent.forEach(function(cur_student, index, arr) {
                     var html, newHtml, listSubj="";
                    // 1. Create html string placehoder
                    html =  `
                        <tr id ="%id%">
                            <td>%maSo%</td>
                            <td>%hoTen%</td>
                            <td>%gioiTinh%</td>
                            <td>%ngaySinh%</td>
                            <td> 
                                <ul class="list-group list-group-flush">
                                    %listSubj%
                                </ul>
                            </td>
                        </tr>    

                        `;
                    
                    //2. Replace the placeholder text with some actual data 
                    newHtml = html.replace("%maSo%", cur_student.mssv);
                    newHtml = newHtml.replace("%hoTen%", cur_student.name);
                    newHtml = newHtml.replace("%gioiTinh%", cur_student.gender);
                    newHtml = newHtml.replace("%ngaySinh%", cur_student.birthDay);
                    newHtml = newHtml.replace("%id%", cur_student.id);
                    
                    cur_student.regisList.forEach(function(cur_subj, index, arr) {
                        listSubj += '<li class="list-group-item">' + cur_subj.name + '</li>'
                    })
                    
                    newHtml = newHtml.replace("%listSubj%", listSubj);
                    
                    document.querySelector('#modal-2').insertAdjacentHTML("beforeend",newHtml);
                });
            };
            $('#exampleModal-2').modal('show');
        }
    }
    
}) ();





var appController = (function(dataCtrl, UICtrl) {
    var SubName = [
        'Phát triển ứng dụng Web', 
        'Chuyên đề Java', 
        'CSDL Web', 
        'Lập trình hướng đối tượng', 
        'Trí tuệ nhân tạo',
        'lập trình nhúng',
        'Xử lý ảnh',
    ];
    
    var  setupEventListener = function() {
   
       
        document.querySelector('.subjects').addEventListener('click', CtrlSelectSubj);
        document.querySelector('.registered').addEventListener('click', CtrlSelectSubj);
        
        document.querySelector('.btn-push-each').addEventListener('click', CtrlPushEachSubj);
        document.querySelector('.btn-push-all').addEventListener( 'click', CtrlPushAllSubj);
        document.querySelector('.btn-pop-each').addEventListener( 'click', CtrlPopEachSubj);
        document.querySelector('.btn-pop-all').addEventListener(  'click', CtrlPopAllSubj);
        document.querySelector('#btn-showList').addEventListener( 'click', CtrlShowList);
        
        document.getElementById("btn-regis").addEventListener('click', CtrlAddStudent);
        document.querySelector('.table').addEventListener('click', CtrlSelectStudent);
        
    };
    
    var CtrlAddStudent = function() {
        var data, studentInf, newStudent, arr_status;
        console.log('called')
        data = dataCtrl.getData()
        studentInf = UICtrl.getInput();
        
        // check input
        arr_status = data.allSubject.map(function(el, index, arr) {
            return el.status;
        });
        
        if (arr_status.includes(3) && studentInf.maSo.length > 0 && studentInf.gioiTinh.length > 0 && studentInf.hoTen.length > 0 ) {
            
            dataCtrl.addStudentIntoData(studentInf.maSo, studentInf.hoTen, studentInf.gioiTinh, studentInf.birthDate, data.allSubject)
            data = dataCtrl.getData();

            UICtrl.showAllStudentOnTheUI(data);

            dataCtrl.resetData();
            data = dataCtrl.getData()
            UICtrl.resetUI(data);
        } else {
            alert('Please enter the correct information !!!');
        }
        
        
    };
    
    // Event when click subject
    var CtrlSelectSubj = function(event) {
        var data, id;
        
        id = event.target.id;
        console.log(id);
        
        // Update status of subject selected
        dataCtrl.updateDataWhenSelectSubj(id);
        
        // Update UI of subject selected
        data = dataCtrl.getData();
        UICtrl.updateColorWhenSelectSubj(id, data.allSubject[id].status);
        
    };
    
    var CtrlSelectStudent = function(event) {
        var data, id, studentInf, subjInf, html;
        
        data = dataCtrl.getData();
        id = event.target.parentNode.id;
        if(id) {
            studentInf =  `
                        <p>Maso: %maSo%<p>
                        <p>Hoten: %hoTen%<p>
                        <p>Gioitinh: %gioiTinh%<p>
                        <p>Ngaysinh: %ngaySinh%<p>
                        <p style="margin-left: 68px">Monhoc: <p>
                    `;
            html = studentInf.replace("%maSo%", data.allStudent[id].mssv);
            html = html.replace("%hoTen%", data.allStudent[id].name);
            html = html.replace("%gioiTinh%", data.allStudent[id].gender);
            html = html.replace("%ngaySinh%", data.allStudent[id].birthDay);
            
            document.querySelector('#modal-1').innerHTML = html;
            
            data.allStudent[id].regisList.forEach(function(cur_subj, index, arr_subj) {
                 document.querySelector('#modal-1').insertAdjacentHTML('beforeend', '<p style = "margin-left: 130px">' + cur_subj.name) + '<p>';
            });
            
            $('#exampleModal-1').modal('show');
            
    
        }
        else console.log('not have id');
        console.log(id);
       
    };
    
    var CtrlPushEachSubj = function() {
        dataCtrl.updateSubjOnDataWhenPushEach();
        
        UICtrl.clearFiled();
        
        var data = dataCtrl.getData();
        UICtrl.showAllSubject(data);
       // UICtrl.updateSubjOnTheUI(data);
       // dataCtrl.updateSubjOnData();
    };  
    
    var CtrlPushAllSubj = function() {
        dataCtrl.updateSubjOnDataWhenPushAll();
        UICtrl.clearFiled();
        var data = dataCtrl.getData();
        UICtrl.showAllSubject(data);
    };  
    var CtrlPopEachSubj = function() {
        dataCtrl.updateSubjOnDataWhenPopEach();
        UICtrl.clearFiled();
        var data = dataCtrl.getData();
        UICtrl.showAllSubject(data);
    };  
    var CtrlPopAllSubj = function() {
        dataCtrl.updateSubjOnDataWhenPopAll();
        UICtrl.clearFiled();
        var data = dataCtrl.getData();
        UICtrl.showAllSubject(data);
    };
    
    var CtrlShowList = function() {
        var data = dataCtrl.getData();
        UICtrl.showListDetail(data);
    }
    
    return {
        init: function() {
            console.log('Application has started !!!');
            
            // add Subject list in data
            SubName.forEach(function(cur_item, index, arr) {
                dataCtrl.addSubject(cur_item);
            });
            
            // test function getData
            var data = dataCtrl.getData();
            console.log(data);
            
            // show Subject on the UI
            UICtrl.showAllSubject(data);
            //
            setupEventListener();
        },
    };
    
}) (dataController, UIController);

appController.init();

