const {
    REST,
    Routes,
    SlashCommandBuilder
} = require('discord.js');

require('dotenv').config();

const commands = [
    new SlashCommandBuilder()
        .setName('tryout')
        .setDescription('AUREON Tryout Hub')

        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a new tryout lobby')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('close')
                .setDescription('Close the active tryout lobby')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('results')
                .setDescription('Create tryout results for a player')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Show the top 10 AUREON players by OVR')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('profile')
                .setDescription('Show a player\'s AUREON profile')
                .addUserOption(option =>
                    option
                        .setName('player')
                        .setDescription('The player to view')
                        .setRequired(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('announce')
                .setDescription('Announce an upcoming AUREON tryout')
                .addStringOption(option =>
                    option
                        .setName('unit')
                        .setDescription('Minutes or hours')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Minutes', value: 'minutes' },
                            { name: 'Hours', value: 'hours' }
                        )
                )
                .addIntegerOption(option =>
                    option
                        .setName('amount')
                        .setDescription('How long until the tryout')
                        .setRequired(true)
                        .setMinValue(1)
                        .setMaxValue(240)
                )
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const clientId = '1547928788229423104';
const guildId = '1546549175292919928';

(async () => {
    try {
        console.log('⏳ Registering AUREON commands...');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );

        console.log('✅ AUREON commands registered successfully!');
        console.log('⚡ Available commands:');
        console.log('   /tryout create');
        console.log('   /tryout close');
        console.log('   /tryout results');
        console.log('   /tryout leaderboard');
        console.log('   /tryout profile');
        console.log('   /tryout announce');
    } catch (error) {
        console.error('❌ Failed to register commands:');
        console.error(error);
    }
})();