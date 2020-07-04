import React, { Component } from "react";
import {Button,Row,Col, } from "react-bootstrap";
import {connect} from "react-redux";
import * as actions from "../entities/itunes/action";
import { Card, Avatar,Input,Spin  } from 'antd';
import { CaretRightOutlined, InfoOutlined,PauseOutlined,HeartFilled, AppleFilled ,HeartTwoTone} from '@ant-design/icons';
import classes from "../CSS/home.module.css";
import "aos/dist/aos.css";
import Aos from "aos";
import { Link } from "react-router-dom";


class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            artist:'',
           
         
        }
    }
    handleChange = (event) => {
        this.setState({artist:event.target.value});
        
      }  
      
    render(){
        Aos.init({duration:1000})
        const { Meta } = Card;
        const { Search } = Input;
        console.log("My data",this.props.data)
        return(
            <>
                
                    <div className="container-fluid" style={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",backgroundColor:"whitesmoke",height:"50px",
                margin:0}}>
                        <center><AppleFilled style={{fontSize:"200%"}} /></center>
                    </div>
                    <br/>
                    <div className="container-fluid" style={{margin:0}} >
                    <Search onChange={this.handleChange} placeholder="Search artist or track name.." onSearch={()=>{this.props.updateSearch(this.state.artist)}} enterButton />
                    <br/>
                    {
                        this.props.data.length>0?<center><br/><h2 style={{fontFamily:"Lexend Giga"}}>Here's what we found related to "{this.state.artist}" :</h2></center>:
                        
                        <div className="container" style={{fontFamily:"Lexend Giga"}}>
                            <br/><br/>
                            <center><h1 data-aos="fade-up">Search for your favourite songs or artists in the search bar!</h1></center>
                        </div>
                    }
                <br/>
                {
                    this.props.loading?<center><Spin size="large" tip="Loading..."/></center>:
                    <div style={{backgroundColor:"whitesmoke",margin:0}} className={classes.BgDiv}>
                <Row >
                    {
                        this.props.data.map((artists,i)=>{
                         
                        
                            return(
                                <>
                                    <Col style={{display:"flex",alignItems:"center",flexDirection:"column",marginTop:20,marginBottom:20}} sm={6} md={4} xs={12} >
                                       
                                        <Card
                                        data-aos="fade-right"
                                             hoverable={true}
                                            style={{ width: 300 , overflow:"hidden"}}
                                            loading={this.props.loading}
                                            
                                            cover={
                                            
                                                <img
                                                style={{height:300}}
                                                className={classes.Img}
                                                alt="example"
                                                src={artists.artworkUrl100}
                                            />
                                          
                                            }

                                            actions={[
                                               
                                                
                                            <CaretRightOutlined onClick={()=>{
                                                const audioEl = document.getElementsByClassName("audio-element")[i]
                                                audioEl.play()
                                            }} key="play" />,
                                            <PauseOutlined onClick={()=>{
                                                const audioEl = document.getElementsByClassName("audio-element")[i]
                                                audioEl.pause()
                                            }} key="pause" />,
                                            
                                            <Link  to={`/collection/${artists.trackCensoredName}`} ><InfoOutlined key="info"/></Link>
                                            ]}
                                            
                                        >
                                            <audio className="audio-element">
                                                <source src={artists.previewUrl}></source>
                                            </audio>,
                                            
                                            <Meta
                                            
                                            avatar={<Avatar src={artists.artworkUrl100} />}
                                            title={artists.trackCensoredName}
                                            description={[
                                            <div>
                                                <p>Type: {artists.kind} </p>
                                                <p>Price: {artists.trackPrice}$</p>
                                                
                                            </div>
                                            ]} 
                                            />
                                        </Card>
                                    

                                        </Col>
                                        
                                   
                                </>
                            )
                        })
                    }
                    </Row>
                    </div>
                
                }
                
                </div>
                
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);