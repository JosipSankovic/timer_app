import {useState} from "react";
import { createAPIEndpoint} from "./api";
import "./styles/ModalDialog.css";
export default function ModalDialog(props){

const [inputProjectName,setInputProjectName]=useState("");
let thisProject=new FormData();
console.log(props.thisProjectId);

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
        let month = newDate.getMonth()+1;
        let year = newDate.getFullYear();
        let hour=newDate.getHours();
        let minute=newDate.getMinutes();
        let seconds=newDate.getSeconds();
        return year+"-"+month+"-"+date+"T"+hour+":"+minute+":"+seconds+".000Z";
    }

    function endProject(){
        
        thisProject.append("projectStop",getDateTime());
        thisProject.append("projectName",inputProjectName);
        thisProject.append("projectId",props.thisProjectId)
        
    
        createAPIEndpoint().update(thisProject).then(res=>{
          console.log(res);
          props.projectEnd();
          thisProject.delete("projectStop");
            thisProject.delete("projectName");
            thisProject.delete("projectId");
        }).catch(res=>{
            console.log(res);
            thisProject.delete("projectStop");
            thisProject.delete("projectName");
            thisProject.delete("projectId");

                })
    }

   
}