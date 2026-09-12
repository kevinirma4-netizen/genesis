require('dotenv').config();

const {
    REST,
    Routes,
    SlashCommandBuilder
} = require('discord.js');

const TOKEN =
    process.env.TOKEN ||
    process.env.DISCORD_TOKEN;

const CLIENT_ID =
    process.env.CLIENT_ID ||
    process.env.DISCORD_CLIENT_ID;

const GUILD_ID =
    process.env.GUILD_ID ||
    process.env.DISCORD_GUILD_ID;

if (!TOKEN) {
    console.error('❌ TOKEN is missing from .env');
    process.exit(1);
}

if (!CLIENT_ID) {
    console.error('❌ CLIENT_ID is missing from .env');
    process.exit(1);
}

if (!GUILD_ID) {
    console.error('❌ GUILD_ID is missing from .env');
    process.exit(1);
}

/* =========================================================
   AUREON • TRYOUT COMMANDS
========================================================= */

const tryoutCommand =
    new SlashCommandBuilder()
        .setName('tryout')
        .setDescription('AUREON Tryout System')

        /* =================================================
           CREATE
        ================================================= */

        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('create')
                    .setDescription(
                        'Create a tryout lobby'
                    )
        )

        /* =================================================
           CLOSE
        ================================================= */

        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('close')
                    .setDescription(
                        'Close your active tryout'
                    )
        )

        /* =================================================
           RESULTS
        ================================================= */

        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('results')
                    .setDescription(
                        'Create a player result'
                    )
        )

        /* =================================================
           LEADERBOARD
        ================================================= */

        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('leaderboard')
                    .setDescription(
                        'Show the tryout leaderboard'
                    )
        )

        /* =================================================
           PROFILE
        ================================================= */

        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('profile')
                    .setDescription(
                        'Show a player profile'
                    )
                    .addUserOption(
                        option =>
                            option
                                .setName('player')
                                .setDescription(
                                    'Select a player'
                                )
                                .setRequired(true)
                    )
        )

        /* =================================================
           ANNOUNCE
        ================================================= */

        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('announce')
                    .setDescription(
                        'Announce a tryout'
                    )
                    .addStringOption(
                        option =>
                            option
                                .setName('unit')
                                .setDescription(
                                    'Choose minutes or hours'
                                )
                                .setRequired(true)
                                .addChoices(
                                    {
                                        name: 'Minutes',
                                        value: 'minutes'
                                    },
                                    {
                                        name: 'Hours',
                                        value: 'hours'
                                    }
                                )
                    )
                    .addIntegerOption(
                        option =>
                            option
                                .setName('amount')
                                .setDescription(
                                    'How long should the announcement last?'
                                )
                                .setRequired(true)
                                .setMinValue(1)
                                .setMaxValue(168)
                    )
        )

        /* =================================================
           SCRIM
        ================================================= */

        .addSubcommand(
            subcommand =>
                subcommand
                    .setName('scrim')
                    .setDescription(
                        'Create an AUREON Friendly or ELO scrim'
                    )
        );

/* =========================================================
   REGISTER COMMAND
========================================================= */

const rest =
    new REST({
        version: '10'
    }).setToken(
        TOKEN
    );

(async () => {
    try {
        console.log(
            '🔄 Registering AUREON /tryout command...'
        );

        const commandData =
            tryoutCommand.toJSON();

        console.log(
            '📋 Subcommands being registered:'
        );

        for (
            const option
            of commandData.options
        ) {
            console.log(
                `   • /tryout ${option.name}`
            );
        }

        await rest.put(
            Routes.applicationGuildCommands(
                CLIENT_ID,
                GUILD_ID
            ),
            {
                body: [
                    commandData
                ]
            }
        );

        console.log('');
        console.log(
            '======================================'
        );
        console.log(
            '✅ COMMAND REGISTRATION COMPLETE'
        );
        console.log(
            '======================================'
        );
        console.log('');
        console.log(
            'Registered commands:'
        );
        console.log(
            '  /tryout create'
        );
        console.log(
            '  /tryout close'
        );
        console.log(
            '  /tryout results'
        );
        console.log(
            '  /tryout leaderboard'
        );
        console.log(
            '  /tryout profile'
        );
        console.log(
            '  /tryout announce'
        );
        console.log(
            '  /tryout scrim'
        );
        console.log('');
    } catch (error) {
        console.error('');
        console.error(
            '======================================'
        );
        console.error(
            '❌ FAILED TO REGISTER COMMANDS'
        );
        console.error(
            '======================================'
        );
        console.error(error);
        console.error('');
    }
})();
