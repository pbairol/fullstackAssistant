const Task = require('../model/Task')

const Anthropic = require("@anthropic-ai/sdk");
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

const anthropic = new Anthropic({
    apiKey: process.env.API_KEY
});




client.on('messageCreate', async (message) => {


    if (message.content.startsWith('!reminder')) {
        // Extract the task name from the message
        const taskName = message.content.slice(9).trim();
        try {
            // Create a new task with the name and status incomplete

            const response = await generateHowTo(taskName);
            const howtoInstructions = response.content[0].text
            const task = new Task({ name: taskName, completed: false, howto: howtoInstructions });
            await task.save();

            // Send the how-to instructions as a reply
            message.reply(`Reminder "${taskName}" created. Here are the how-to instructions:\n${howtoInstructions}`);
        } catch (error) {
            console.error(error);
            message.reply('Error creating task.');
        }
    }
    console.log(message.content);
});



async function generateHowTo(taskName) {
    try {
        const message = await anthropic.messages.create({
            max_tokens: 1024,
            messages: [{ role: 'user', content: "How do you complete this task in this reminder: " + taskName + ", keep the response within 3 bullets and only return the bullets in a string with new lines" }],
            model: 'claude-1.3'
        });
        return message;
    } catch (error) {
        console.error('Error generating "how to" description:', error);
        return null;
    }
}



const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}


const createTask = async (req, res) => {
    const { name, completed, howto } = req.body;
    console.log(name, completed, howto)
    try {
        if (!howto || howto.length === 0) {
            const response = await generateHowTo(name);
            const message = response.content[0].text
            const task = new Task({ name, completed, howto: message });
            await task.save();
            res.status(201).json({ task });
        }
        else {
            const task = new Task({ name, completed, howto });
            await task.save();
            res.status(201).json({ task });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error });
    }
}

// Other controller functions remain unchanged



const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No reminder with the id:  ${taskID}` })
        }


        res.status(200).json({ task })
    }
    catch (error) {
        res.status(500).json({ msg: error })

    }
}


const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId });
        if (!task) {
            return res.status(404).json({ msg: `No reminder with the id:  ${taskID}` })
        }
        res.status(200).json({ task: null, status: 'success' })
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).json({ msg: `No reminder with the id:  ${taskID}` })
        }
        res.status(200).json({})
    }
    catch (error) {
        res.status(500).json({ msg: error })
    }

}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}