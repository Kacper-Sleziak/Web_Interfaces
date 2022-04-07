
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import SingleNotice from "../components/SingleNotice";
import TextField  from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import React from 'react';
import StudentService from "../services/StudentService";
import AddNotice from "../components/AddNotice";
import {useEffect} from 'react';
import {useState} from 'react';
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";


function PersonSearch() {

    // States
    const [notices, setNotices] = useState([...StudentService.getStudents()]);
    const [searchText, setSearchText] = useState("")

    // Styles of page
    const useStyles= makeStyles({
        topContainer: {
            marginTop:"48px",
            paddingBottom: "60px",
            width:"80%",
            marginLeft:"auto", 
            marginRight:"auto",
            borderBottom: "1px solid black"
        },

        noticesContainer: {
            width:"90%",
            alignItems: "center",
            paddingTop: "20px",
            borderBottom: "1px solid black"
        },

        searchingBar: {
            display: "flex", 
            justifyContent: "center", 
            marginTop:"30px"
        },

        noResultsText: {
            marginTop:"80px", 
            marginBottom:"80px", 
            display:"flex", 
            justifyContent: "center"
        }
        });

    // Styles object 
    const classes = useStyles();


    // refresh notices state after adding new student Notice do StudentService 
    function rehresh() {
        setNotices([...StudentService.getStudents()]);
    }


    // find notices by text given in text field
    const searchNotices = () => {
        if (searchText === ""){
            setNotices([...StudentService.getStudents()]);
        }

        else {
            const foundNotices = []
            const studentNotices = [...StudentService.getStudents()]

            for (var i = 0; i < studentNotices.length ; i++) {
                var notice = studentNotices[i]
                var tags = notice.tags.toLowerCase()
                var description = notice.description.toLowerCase()
                var subject = notice.subject.toLowerCase()

                const text = searchText.toLowerCase()
                
                if(
                    tags.includes(text) || description.includes(text) ||
                    subject.includes(text)
                )

                {
                    foundNotices.push(notice);
                }
            }
            setNotices(foundNotices);
        }
    }

    // Search Handler
    useEffect(() => {
        searchNotices();
    }, [searchText])

    // Render notices 
    function renderNotices() {
        if (notices.length !=0){
            return(
                notices.map((notice, key) => (
                    <SingleNotice notice={notice}/>
                    ))
                )
        }

        else {
            return(
                <Typography 
                variant="h6"
                className={classes.noResultsText}
                >
                    No results for given parameters.
                </Typography>
            )
        }
    }

    return (
        <div
        style={{backgroundColor:"#F9F8F8"}}
        >
        <Navbar/>

        <Grid container 
        className={classes.topContainer}
        direction="column"
        alignItems="center"

        >
            <Grid item
            style={{marginTop: "20px"}}
            >
                <Typography
                variant="h5"
                >
                    Find Student
                </Typography>
            </Grid>

            
            <Grid item
            xs ={12} sm={8} md={8}
            className={classes.searchingBar}
            >   
                <TextField
                label="search"
                size="large"
                variant="standard"  
                onChange = {(e) => setSearchText(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchRoundedIcon />
                    </InputAdornment>
                    )
                }}
                />
            </Grid>

            <Grid item
            style={{marginTop: "20px", fontWeight: "100"}}
            >
                <Typography
                variant="h6"
                >
                    You can find notices by: tags, subjects and descriptions
                </Typography>
            </Grid>

        </Grid>

        <Container
        className={classes.noticesContainer}
        >
            {renderNotices()}
        </Container>

        <AddNotice refresh={rehresh}/>
        </div>
    );
  }
  
  export default PersonSearch;


  
  

