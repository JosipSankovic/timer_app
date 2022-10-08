import {useState} from "react";
import { createAPIEndpoint} from "./api";
import "./styles/ModalDialog.css";
export default function ModalDialog(props){

const [inputProjectName,setInputProjectName]=useState("");
let thisProject=new FormData();

    if(props.show===false){
        return(null);
    }else    
    return(
        <div className="projectInfo">
            <div className="dialogHeader">
                <p >Stop Timer</p>
                <button className="closeDialogbtn" onClick={()=>props.hideModal()}>X</button>
            </div>
            <p>Project name</p>
            <input type="text" value={inputProjectName} onChange={e=>setInputProjectName(e.target.value)}></input>              
            <button className="btnEnd" onClick={endProject}>Stop timer</button>

        </div>
    )


    function getDateTime(){
        let newDate = new Date()
        let date = newDate.getDate();
        if(date<10)date="0"+date;
        let month = newDate.getMonth()+1;
        if(month<10)month="0"+month;
        let year = newDate.getFullYear();
        let hour=newDate.getHours();
        if(hour<10)hour="0"+hour;
        let minute=newDate.getMinutes();
        if(minute<10)minute="0"+minute;
        return year+"-"+month+"-"+date+"T"+hour+":"+minute+":00.000Z";
    }

    function endProject(){
        
        thisProject.append("projectStop",getDateTime());
        thisProject.append("projectName",inputProjectName);
        thisProject.append("projectId",props.thisProjectId)
        
    
        createAPIEndpoint().update(thisProject).then(res=>{

          props.projectEnd();
          thisProject.delete("projectStop");
            thisProject.delete("projectName");
            thisProject.delete("projectId");
            setInputProjectName("");
        }).catch(res=>{

            thisProject.delete("projectStop");
            thisProject.delete("projectName");
            thisProject.delete("projectId");

                })
    }

   
}