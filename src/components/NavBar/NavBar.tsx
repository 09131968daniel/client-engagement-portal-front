import React, { useState } from 'react';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, ButtonDropdown } from 'reactstrap';
import logo from '../../assets/logo.png';
import menuArrow from '../../assets/down-arrow.png';
import  '../../scss/navStyles.scss';
import { Turn as Hamburger } from 'hamburger-react'
import { Link } from 'react-router-dom';
// interface INavBarProps{
//     dropDownProps?:React.ComponentType<DropdownItem>[];
// }


export const NavBar: React.FC<any> = (props: any) => {
    const [navMenuOpen, setNavMenuOpen] = useState(false);
    const [hamOpen, setHamOpen] = useState(false);

    const hamToggle = () => setHamOpen(!hamOpen);
    const toggle = () => {setNavMenuOpen(!navMenuOpen)
        setHamOpen(!navMenuOpen);
    };

    return(
        <Row className="justify-content-around myNav">
            <Col xs="auto" className="justify-content-start logoContainer">
                <img src={logo} className="myLogo" alt="revature logo"/>
            </Col>
            
            <Col className="d-flex align-items-center justify-content-end auto " >
                <ButtonDropdown isOpen={navMenuOpen} toggle={toggle}>
                     {/* Mobile Hamburger Menu */}
                     <DropdownToggle className="" style={{margin:"10px", backgroundColor: "white", border: "none"}}>
                        <span className="myDropdown" style={{margin:"5px",color:"#474C55", backgroundColor: "white", border: "none"}}>Welcome, Lorem Ipsum &#9660;</span>
                        <span className="myMobileDropdown">
                         <Hamburger hideOutline={true} toggled={hamOpen} toggle={setHamOpen} color="#474C55"></Hamburger>
                        </span>
                    </DropdownToggle>
                    {/* Desktop Menu */}    
                    <DropdownMenu right>
                        <Link to="/"><DropdownItem onClick={LogOut}>Logout</DropdownItem></Link>
                        {props.children}
                    </DropdownMenu>
                </ButtonDropdown>
            </Col>


{/* 
            <Col className="d-flex align-items-center justify-content-end auto" id="myMobileDropdown" >
                <Dropdown isOpen={navMenuOpen} toggle={toggle}>
                    
                    <DropdownMenu right>
                        <a href="/"><DropdownItem>Logout</DropdownItem></a>
                    </DropdownMenu>
                </Dropdown>
            </Col> */}
        </Row>
    )
}
