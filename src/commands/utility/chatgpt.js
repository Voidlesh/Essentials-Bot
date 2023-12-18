const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { MESSAGES, EMBED_COLORS } = require("@root/config.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.CHAT_API
})

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "chatgpt",
  description: "talk with chatgpt",
  cooldown: 5,
  category: "UTILITY",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "<message>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "question",
        description: "your message to talk with chatqpt",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {

    const question = args[0];

    return;
    
  },

  async interactionRun(interaction) {

    await interaction.deferReply();

    const question = interaction.options.getString("question");

    chatGPT(interaction, question)
    
  }

  async function chatGPT(interaction, question) {

  try {
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 2048,
      temperature: 0.5,
      prompt: question
    })

    const embed = new EmbedBuilder()
      .setTitle("ChatGPT")
      .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)
      .setColor(EMBED_COLORS.BOT_EMBED)

    await interaction.editReply({ embeds: [embed] });

  } catch (error) {
    return await interaction.editReply({ content: error }, ephemeral: true);
  }
  
  }
}