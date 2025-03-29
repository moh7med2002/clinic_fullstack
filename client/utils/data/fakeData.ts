export const patients =  [
        {
        "id": 1,
        "username": "john_doe",
        "image": "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "email": "john_doe@example.com"
        },
        {
        "id": 2,
        "username": "jane_smith",
        "image": "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "email": "jane_smith@example.com",
        "birthdate":"2025-03-02"
        },
        {
        "id": 3,
        "username": "robert_jones",
        "image": "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "email": "robert_jones@example.com",
        "birthdate":"2025-03-02"
        },
        {
        "id": 4,
        "username": "emily_davis",
        "image": "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "email": "emily_davis@example.com",
        "birthdate":"2025-03-02"
        },
        {
        "id": 5,
        "username": "alex_martin",
        "image": "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "email": "alex_martin@example.com",
        "birthdate":"2025-03-02"
        }
]

export const departments = [
{id:1,name:"Implent",doctors:['Ahmed']}
,{id:2,name:"tooth",doctors:['Ahmed Sayed','Ali Sayed','Yousef Salem',"Sami Saad Sami Saad","Yousef Hesham Mohammed ABbohani",'Ahmed Sayed','Ali Sayed','Yousef Salem',"Sami Saad Sami Saad","Yousef Hesham Mohammed ABbohani"]}
]

export const doctors =  [
        {
        "id": 1,
        "username": "john_doe",
        "image": "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "email": "john_doe@example.com",
        "department":{
                name:"Tooth"
        },
        "birthdate":"2025-03-02"
        },
        {
        "id": 2,
        "username": "jane_smith",
        "image": "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "email": "jane_smith@example.com",
        "department":{
                name:"Tooth"
        },
        "birthdate":"2025-03-02"
        }
]

export const appointments = [
{
        id:1,
        patient:{
                name:"Yousef"
        },
        doctor:{
                name:"Mohammed"
        },
        date:"2025-03-02 14:30:00",
        note:"we all want that",
        status:"pending"
},
{
        id:2,
        patient:{
                name:"Yousef"
        },
        doctor:{
                name:"Mohammed"
        },
        date:"2025-03-02 14:30:00",
        note:"we all want that",
        status:"completed"
},
{
        id:3,
        patient:{
                name:"Yousef"
        },
        doctor:{
                name:"Mohammed"
        },
        date:"2025-03-02 14:30:00",
        note:"we all want that",
        status:"canceled"
}
]

export const transactions = [
{
        id:1,
        patient:{
                name:"Yousef"
        },
        fee:200,
        date:"2025-03-02 14:30:00",
        note:"we all want that",
        status:"paid"
},
{
        id:2,
        patient:{
                name:"Yousef"
        },
        fee:200,
        date:"2025-03-02 14:30:00",
        note:"we all want that",
        status:"amount_due"
}
]