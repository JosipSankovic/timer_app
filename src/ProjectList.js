import {useRef} from "react";
import "./styles/ProjectList.css";
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function ProjectList(props){
    const allProjects=[];
    const tableRef=useRef(null);
    
    if(props.list!=null){
        props.list.forEach(x => {
            var stop="";
            if(x.projectStop==null){
                var Stop="...";
            }else{
                var projectStop=new Date(x.projectStop);
                stop=projectStop.getDay()+"."+projectStop.getMonth()+"."+projectStop.getFullYear()+" "+ projectStop.getHours()+":"+projectStop.getMinutes()
            }
           
            allProjects.push(
            <tr key={x.projectId}>
                <td>
                    {x.projectName}
                </td>
                <td>
                {x.projectStart.getDay()}.{x.projectStart.getMonth()}.{x.projectStart.getFullYear()} {x.projectStart.getHours()}:{x.projectStart.getMinutes()}
                </td>
                <td>
                    {stop}
                </td>
                <td>
                    {x.duration}
                </td>
                
            </tr>
            )
            
        });
        return(
            <>
            <table ref={tableRef}>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Start</th>
                        <th>Stop</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {allProjects}
                    <tr>
                    
                    </tr>
                </tbody>
            </table>
            <DownloadTableExcel filename="Project_timer" sheet="Projects" currentTableRef={tableRef.current}>
    <button> Export excel </button>
    </DownloadTableExcel>

            </>
        )
    }
    
    
}