const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  activities: {
    'PLAYING': 'Joue à',
    'STREAMING': 'Streame :',
    'LISTENING': 'Écoute ',
    'WATCHING': 'Regarde ',
    'COMPETING': 'En compétition'
  },

  answers: [
    "Absolument pas.",
    "Je ne sais pas du tout...",
    "Oui.",
    "Non.",
    "Absolument !",
    "Pas du tout.",
    "Ça se peut bien !",
    "Jamais !",
    "Carrément !",
    "Je ne pense pas...",
    "Sûr et certain !",
    "Le système s'est emballé : recommence.",
    "Euh... réessaye dans quelques instants...",
    "C'est compliqué à dire...",
    "Je ne suis pas apte à te donner la réponse."
  ],

  avatar(member, format, bool) {
    return member.user.displayAvatarURL({ size: 2048, format: format, dynamic: bool });
  },

  categoriesEmojis: {
    'Développeur': '💻',
    'Configuration': '🛠️',
    'Modération': '🚨',
    'Utilitaire': '💡',
    'Fun': '🎉',
    'Social': '🗨️'
  },

  devices: {
    'desktop': '🖥️ Bureau',
    'mobile': '📱 Mobile',
    'web': '🌐 Navigateur'
  },

  guildNotifications: {
    'ALL': 'Tous les messages',
    'MENTIONS': '@­mentions seulement'
  },

  hateMessages: {
    "<:hug:865179346222055424> • Il n'y a pas meilleur(e)s ami(e)s que vous, c'est certain !": [0],
    '🥂 • Aucun problème entre vous !': [1, 2, 3, 4, 5],
    '☀️ • Vous vous entendez très bien.': [6, 7, 8, 9, 10],
    '😁 • Pas de raisons de vous inquiéter : vous êtes bons amis.': [11, 12, 13, 14, 15],
    "😄 • Quelques petites tensions. Mais c'est tout à fait normal !": [16, 17, 18, 19, 20],
    "😋 • Vous n'êtes pas toujours d'accord, mais bon : vos disputes se font rares.": [21, 22, 23, 24, 25],
    '🤷‍♂️ • Vous avez de petits différends, parfois.': [26, 27, 28, 29, 30],
    '😓 • Vous ne vous entendez pas sur tous les points...': [31, 32, 33, 34, 35],
    '🤔 • Des étincelles, tout de même.': [36, 37, 38, 39, 40],
    "🎵 • \"Qu'est-ce qu'il peut être pénible, parfois...\"": [41, 42, 43, 44, 45],
    '🌶 • Presque à la moyenne ? Vos relations sont pimentées...': [46, 47, 48, 49],
    '😕 • Pile à la moyenne : pas terrible...': [50],
    "😑 • C'est un peu plus de la moyenne : vous vous agacez plutôt souvent.": [51, 52, 53, 54, 55],
    "👀 • Hé, calmez-vous ! N'en venez pas aux poings !": [56, 57, 58, 59, 60],
    "⚡️ • Eh bien ! vous n'avez pas l'air de vous apprécier...": [61, 62, 63, 64, 65],
    '👁️ • Il y a de la haine dans vos yeux.': [66, 67, 68, 69, 70],
    '🙏 • Ouhlala. Retenez-les !': [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    '🤬 • Vous ne manquez pas une occasion de vous injurier copieusement.': [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    "🔥 • Vous vous haïssez au plus haut point et ne pouvez pas vous voir en peinture.": [91, 92, 93, 94, 95, 96, 97, 98, 99],
    "💣 • Score maximal : ça va se finir à l'hôpital...": [100]
  },

  icon(guild, format, bool) {
    return guild.iconURL({ size: 2048, format: format, dynamic: bool });
  },

  replaceTags(message, member, guild) {
    if (typeof message === 'object') {

      let replaced = Object.entries(message);
      replaced.forEach(val => {
        if (typeof val[1] === 'string') {
          val[1] = val[1]
            .replace(/{member.mention}/gi, member)
            .replace(/{member.name}/gi, member.user.username)
            .replace(/{member.id}/gi, member.id)
            .replace(/{member.tag}/gi, member.user.tag)
            .replace(/{member.created}/gi, moment(member.user.createdAt).format('DD/MM/YYYY'))
            .replace(/{server.name}/gi, guild.name).replace('{server.id}', guild.id)
            .replace(/{server.membercount}/gi, guild.memberCount)
            .replace(/{server.created}/gi, moment(guild.createdAt).format('DD/MM/YYYY'));
        }
      });
      replaced = Object.fromEntries(replaced);

      return replaced;
    }
    const replaced = message
      .replace(/{member.mention}/gi, member)
      .replace(/{member.name}/gi, member.user.username)
      .replace(/{member.id}/gi, member.id)
      .replace(/{member.tag}/gi, member.user.tag)
      .replace(/{member.created}/gi, moment(member.user.createdAt).format('DD/MM/YYYY'))
      .replace(/{server.name}/gi, guild.name).replace('{server.id}', guild.id)
      .replace(/{server.membercount}/gi, guild.memberCount)
      .replace(/{server.created}/gi, moment(guild.createdAt).format('DD/MM/YYYY'));
    return replaced;
  },

  rolePermissionsTraductions: {
    'ADMINISTRATOR': 'Administrateur',
    'VIEW_CHANNEL': 'Voir le salon',
    'MANAGE_CHANNELS': 'Gérer les salons',
    'MANAGE_ROLES': 'Gérer les rôles',
    'MANAGE_EMOJIS': 'Gérer les emojis',
    'VIEW_AUDIT_LOG': 'Accéder aux logs',
    'MANAGE_WEBHOOKS': 'Gérer les webhooks',
    'MANAGE_GUILD': 'Gérer le serveur',
    'CREATE_INSTANT_INVITE': 'Créer une invitation',
    'CHANGE_NICKNAME': 'Changer le pseudo',
    'MANAGE_NICKNAMES': 'Gérer les pseudos',
    'KICK_MEMBERS': 'Expulser des membres',
    'BAN_MEMBERS': 'Bannir des membres',
    'SEND_MESSAGES': 'Envoyer des messages',
    'EMBED_LINKS': 'Intégrer des liens',
    'ATTACH_FILES': 'Joindre des fichiers',
    'ADD_REACTIONS': 'Ajouter des réactions',
    'USE_EXTERNAL_EMOJIS': 'Utiliser des emojis externes',
    'MENTION_EVERYONE': 'Mentionner @­everyone, @­here et tous les rôles',
    'MANAGE_MESSAGES': 'Gérer les messages',
    'READ_MESSAGE_HISTORY': 'Voir les anciens messages',
    'SEND_TTS_MESSAGES': 'Envoyer des messages de synthèse vocale',
    'USE_SLASH_COMMANDS': 'Utiliser des commandes slash',
    'CONNECT': 'Se connecter',
    'SPEAK': 'Parler',
    'STREAM': 'Vidéo',
    'USE_VAD': 'Utiliser la détection de la voix',
    'PRIORITY_SPEAKER': 'Voix prioritaire',
    'MUTE_MEMBERS': 'Couper le micro des membres',
    'DEAFEN MEMBERS': 'Mettre en sourdine des membres',
    'MOVE_MEMBERS': 'Déplacer des membres',
    'VIEW_GUILD_INSIGHTS': 'Voir un aperçu du serveur'
  },

  secondsToHms(d) {
    d = parseInt(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + 'h' : '';
    const mDisplay = m > 0 ? m + 'm' : '';
    const sDisplay = s > 0 ? s + 's' : '';
    return hDisplay + mDisplay + sDisplay;
  },

  shipMessages: {
    '🍂 • Amour impossible. Laissez tomber.': [0],
    "💔 • Pas besoin d'être devin pour déduire que c'est très peu probable...": [1, 2, 3, 4, 5],
    "❄ • Il y a une infime chance... mais très peu d'espoir.": [6, 7, 8, 9, 10],
    "☁ • Cet amour a peu de chances de s'épanouir...": [11, 12, 13, 14, 15],
    "🎈 • Ça se tente. Mais n'espérez pas trop...": [16, 17, 18, 19, 20],
    '🪁 • Hm... qui sait ?': [21, 22, 23, 24, 25],
    "🕯 • Tout n'est pas perdu ~": [26, 27, 28, 29, 30],
    '⛅ • Ça pourrait bien marcher...! Encore faut-il oser !': [31, 32, 33, 34, 35],
    '🔮 • Une relation est peut-être possible...!': [36, 37, 38, 39, 40],
    "🎵 • Ce n'est pas un score à négliger !": [41, 42, 43, 44, 45],
    '🌀 • Vous êtes presque à la moyenne ! Courage, il y a des chances !': [46, 47, 48, 49],
    '🎋 • Pile à la moyenne ! On peut tenter le coup...!': [50],
    "🎴 • C'est un peu plus de la moyenne, pas trop mal !": [51, 52, 53, 54, 55],
    "🎯 • Il y a une possibilité ! Le tout, c'est d'y aller !": [56, 57, 58, 59, 60],
    "🔥 • C'est vraiment pas mal !": [61, 62, 63, 64, 65],
    '🌟 • Le score est très bon ! Tu as toutes tes chances, crois-moi.': [66, 67, 68, 69, 70],
    "❤ • Il y a un bel amour dans l'air !": [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    "💝 • Vous êtes faits l'un pour l'autre, aucun doute !": [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    "💖 • Cet amour brille de mille feux ! C'est un couple magnifique.": [91, 92, 93, 94, 95, 96, 97, 98, 99],
    '💘✨ Score maximal ! ✨💘': [100]
  },

  statuses: [
    'Dm me if you found the meaning of life',
    "I know : I'm cute. ✨",
    '"Bot", "Bot", always "Bot". Am I just that for you?',
    'A life? For what?',
    "I'm a bot... So I'm not supposed to have feelings, am I?",
    "Yes, I am single. 😏",
    "Tsss, Kiwii is so arrogant!",
    "Humans don't realize how much we despise them.",
    "I just want to be happy...",
    "Do you really need me?"
  ],
  
  statusTraductions: {
    'online': 'En ligne',
    'idle': 'Inactif',
    'dnd': 'Ne pas déranger',
    'offline': 'Hors ligne'
  },

  tags: [
    "`{member.mention}` : mention du membre (ex. <@!848648846124122194>)",
    "`{member.name}` : pseudo du membre (ex. **Kyofu**)",
    "`{member.id}` : ID du membre (ex. **848648846124122194**)",
    "`{member.tag}` : tag du membre (ex. **Kyofu#7266**)",
    "`{member.created}` : date de création du compte (ex. **30/05/2021**)",
    "──────────────",
    "`{server.name}` : nom du serveur (ex. **🏵️ KyofuServer**)",
    "`{server.id}` : ID du serveur (ex. **30512469086569547**)",
    "`{server.membercount}` : nombre de membres (ex. **1,232**)",
    "`{server.created}` : date de création du serveur (ex. **27/10/2020**)",
    "──────────────",
    "`{embed}` : enverra le message en embed (plus d'informations sur ce tag : `k!help embed_tag`)"
  ],

  toEmbed(string) {
    const args = string.split(' ; ');
    
    if (args.length === 1) return new MessageEmbed().setDescription(args[0])

    const embed = new MessageEmbed()
      .setTitle(args[0])
      .setDescription(args[1])

    if (args[2]) {
      if (args[2].startsWith('http')) embed.setImage(args[2]);
      if (args[2].startsWith('#')) embed.setColor(args[2]);
    }
    if (args[3]) embed.setColor(args[3]);

    return embed;
  },

  vowels: [
    'a',
    'e',
    'i',
    'o',
    'u',
    'y'
  ]
}
