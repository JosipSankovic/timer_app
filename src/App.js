import React from "react";
import { useState} from "react";
import { createAPIEndpoint} from "./api";
import ProjectList from "./ProjectList";
import ModalDialog from "./ModalDialog";

export default function App(){
    const [projectStarted,setStart]=useState(false);
    const [projectList,setProjectList]=useState(null);
    const [showModal,setShowModal]=useState(false);
    const [btnStartStop,setBtn]=useState("Start");
    const [projectId,setProjectId]=useState(0);
    let thisProject=new FormData();
   
    
    function StartProject(e){
        


        if(projectStarted===true){
            setShowModal(true);
            
        }else{
            startNewProject();
        }
}


    
    return(
        <>
        <button className="startBtn" onClick={StartProject}>{btnStartStop}</button>
        <ProjectList projectDeleted={(projectId)=>projectDeleted(projectId)} list={projectList}/>
        <ModalDialog projectEnd={()=>{projectEnd()}} hideModal={()=>setShowModal(false)} show={showModal} thisProjectId={projectId} />
        
        </>
        );
    

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
    
    function getAllProjects(){
        createAPIEndpoint().fetchall().then(res=>{
            setProjectList( res.data.map(item=>({
                projectId:item.projectId,
                projectName:item.projectName,
                projectStart:new Date(item.projectStart),
                projectStop:item.projectStop,
                duration:item.duration
    
            }
            
            )));
            thisProject.append("projectId",res.data[res.data.length-1].projectId);
            thisProject.append("projectName",res.data[res.data.length-1].projectName);
            thisProject.append("projectStart",res.data[res.data.length-1].projectStart);
            setProjectId(res.data[[res.data.length-1]].projectId);
            
        
    }).catch(exe=>console.log(exe))

   
    }
     function startNewProject(){
        let form=new FormData();
        form.append("projectId",0);
        form.append("projectName","Project");
        form.append("projectStart",getDateTime());

        console.log(form.keys);

         createAPIEndpoint().create(form).then(res=>{
            getAllProjects();
            setBtn("Stop");
            setStart(true);
        }
        ).catch(exe=>console.log(exe))

    }

    function projectEnd(){
        setShowModal(false);
        setBtn("Start");
        setStart(false);
        getAllProjects();
    }
    function projectDeleted(deleteId){
        
        if(deleteId===projectId){
            projectEnd();
        }
        else{
            getAllProjects();
        }
    }

    
}

