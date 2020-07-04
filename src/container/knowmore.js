import React, { Component } from "react";
import {connect} from "react-redux";
import * as actions from "../entities/itunes/action";
import "aos/dist/aos.css";
import Aos from "aos";
import { Link } from "react-router-dom";
import {  Row, Col, Divider  } from 'antd';
import { HomeFilled,ArrowRightOutlined} from '@ant-design/icons';

class KnowMore extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let mydata = this.props.data.filter((item)=>{
            return item.trackCensoredName===this.props.match.params.myTitlename; 
        
         })
         console.log("newdata",mydata)
        return(
            <>
            <div className="container-fluid" style={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",backgroundColor:"whitesmoke",height:"50px",
                margin:0}}>
                        <center><Link to="/"><HomeFilled style={{fontSize:"200%",color:"#565656"}} /></Link></center>
            </div>
                <br/>
             {
                 Object.values(mydata).map((item)=>{
                     console.log("myitem",item)
                     return(
                         <>
                            <div style={{fontFamily:"Lexend Giga"}}>
                            <center><h2>{item.trackCensoredName} </h2></center>
                            <br/>
                            <div className="container">
                            <Row justify="center" align="top">
                               
                                
                                <Col sm={16} xs={20}>
                                    <div className="container">
                                       <p><span><h6>Collection name: </h6> {item.collectionName}</span></p>
                                       <p><span><h6>Artists: </h6> {item.artistName}</span></p>
                                       <p><span><h6>Released on: </h6> {item.releaseDate}</span></p>
                                       <p><span><h6>Track Price: </h6> {item.trackPrice}$</span></p>
                                       <p><span><h6>Collection Price: </h6> {item.collectionPrice}$</span></p>
                                       <p><span><h6>View Track: </h6> <a target="_blank" href={item.trackViewUrl}><ArrowRightOutlined /></a> </span></p>
                                    </div>
                                </Col>
                                <Col xs={0} sm={8}>
                                    <img src={item.artworkUrl100} style={{width:"300px"}}/>
                                </Col>
                            </Row>
                            </div>
                            </div>
                         </>
                     )
                 })
             }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      loading:state.loading,
      data:state.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        updateSearch: (artist)=>{
            dispatch(actions.saveSearch(artist))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(KnowMore);