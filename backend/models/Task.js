const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    description:String,

    status:{
        type:String,
        enum:["Pending","In Progress","Completed"],
        default:"Pending"
    },

    dueDate:Date,

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    sharedWith:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },

            permission:{
                type:String,
                enum:["view","edit"],
                default:"view"
            },

            sharedAt:{
                type:Date,
                default:Date.now
            }
        }
    ],

    shares:{
        totalShares:{
            type:Number,
            default:0
        },

        lastSharedAt:Date,

        sharedBy:[
            {
                userId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User"
                },

                sharedAt:Date
            }
        ]
    },

    attachments:[
        {
            filename:String,
            url:String
        }
    ]
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Task", taskSchema);