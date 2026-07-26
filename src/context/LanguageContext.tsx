'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav Bar
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.speeches': 'Speeches',
    'nav.districts': 'Districts',
    'nav.gallery': 'Gallery',
    'nav.videos': 'Videos',
    'nav.events': 'Events',
    'nav.peoplesVoice': "People's Voice",
    'nav.factcheck': 'Fact Check',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.membership': 'Join Us',
    'nav.volunteer': 'Volunteer',
    'nav.liveTv': 'LIVE TV',
    'nav.admin': 'Admin Portal',
    'nav.searchPlaceholder': 'Search news, events, speeches...',

    // Banner & Ticker
    'ticker.breaking': 'BREAKING NEWS',
    'slogan': 'Voice of People, Power of Youth',
    'readMore': 'Read More',
    'watchVideo': 'Watch Video',
    'backToHome': 'Back to Home',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'search': 'Search',
    'filter': 'Filter',
    'all': 'All',

    // Hero
    'hero.title': 'Voice of People, Power of Youth!',
    'hero.subtitle': 'Young Democrats is a movement of progressive youth working towards social justice, equality, and state development in Tamil Nadu.',

    // Categories
    'cat.partyNews': 'Party News',
    'cat.speeches': 'Speeches',
    'cat.districtNews': 'District News',
    'cat.youthWing': 'Youth Wing',
    'cat.womensWing': "Women's Wing",
    'cat.pressRelease': 'Press Release',
    'cat.electionUpdates': 'Election Updates',
    'cat.governmentIssues': 'Government Issues',

    // Titles / Sections
    'sec.spotlight': 'Featured Spotlight',
    'sec.browseCategory': 'Browse News by Category',
    'sec.browseCategorySub': 'Filter through specific organization sectors and updates',
    'sec.clearFilter': 'Clear Category Filter',
    'sec.verifiedReleases': 'Verified releases, district coverage, and leader speeches',
    'sec.latestNews': 'Latest News Feed',
    'sec.districtHighlights': 'District Highlights',
    'sec.featuredSpeeches': 'Featured Speeches & Addresses',
    'sec.featuredSpeechesSub': 'Excerpts and transcripts of addresses by state convener and wing leads',
    'sec.featuredAddress': 'Featured Address',
    'sec.speaker': 'Speaker',
    'sec.date': 'Date',
    'sec.views': 'views',
    'sec.playSpeech': 'Play Speech',
    'sec.downloadTranscript': 'Download Transcript',
    'sec.mediaGallery': 'Photo & Video Gallery',
    'sec.gallerySub': 'On-the-ground photos from campaigns, youth forums, and rallies',
    'sec.viewPhoto': 'View Photo',
    'sec.eventsSub': 'Calendar of rallies, townhalls, campaigns, and volunteer training',
    'sec.noEvents': 'No events scheduled currently. Check back later!',
    'sec.districtsSub': 'District coordinators and contact channels across Tamil Nadu',
    'sec.mobilePreview': 'Experience Young Democrats On Mobile',
    'sec.mobilePreviewSub': 'Our portal is optimized for lighting fast performance and beautiful visuals on all mobile devices.',
    'sec.mobileFast': 'Sub-second Load',
    'sec.mobileFastSub': 'Optimized bundles for weak connections.',
    'sec.mobileUi': 'Adaptive UI',
    'sec.mobileUiSub': 'Zero-compromise layouts on small screens.',
    'sec.mobileSec': 'Secured Access',
    'sec.mobileSecSub': 'End-to-end security protocols.',
    'sec.latestUpdates': 'Latest Updates',
    'sec.newsletterTitle': 'Stay Informed. Empower the Future.',
    'sec.newsletterSub': 'Subscribe to our weekly news bulletin for direct updates from the leadership.',
    'sec.liveBroadcast': 'Broadcasting Live',
    'sec.liveSub': 'Watch public addresses, student conclaves, district campaigns, and special interviews live from our Chennai headquarters. Engage in modern, active democracy.',
    'sec.liveBullet1': 'State Reforestation Drive inauguration broadcast',
    'sec.liveBullet2': 'Interviews with youth and women wing organizers',
    'sec.liveClick': 'Click to connect to live stream',
    'sec.liveViewers': 'Viewers Online',

    // Ideology
    'ideo.title': 'Our Core Ideology',
    'ideo.subtitle': 'The foundation of the Young Democrats movement is built on six democratic principles.',
    'ideo.socialJustice': 'Social Justice',
    'ideo.socialJusticeSub': 'Ensuring equal rights, fair opportunities, and eradication of caste-based or socioeconomic discrimination.',
    'ideo.equality': 'Equality',
    'ideo.equalitySub': 'A classless society where every citizen has access to equal education, resources, and civic rights.',
    'ideo.secularism': 'Secularism',
    'ideo.secularismSub': 'Upholding harmony and peace among all religions. Keeping religious bias out of policy making.',
    'ideo.democracy': 'Democracy',
    'ideo.democracySub': 'Empowering grassroots governance, active student representation, and transparent leadership.',
    'ideo.youthEmpowerment': 'Youth Empowerment',
    'ideo.youthEmpowermentSub': 'Training young leaders to participate in statecraft, education reform, and clean politics.',
    'ideo.development': 'Sustainable Development',
    'ideo.developmentSub': 'Promoting industrial growth while preserving environmental ecosystems, water bodies, and forests.',

    // Contact Us
    'contact.title': 'Contact Headquarters',
    'contact.subtitle': 'Reach out to the state coordination committee. Our offices are open 24/7.',
    'contact.formName': 'Full Name',
    'contact.formEmail': 'Email Address',
    'contact.formPhone': 'Phone Number',
    'contact.formMessage': 'Your Message / Inquiry',
    'contact.formSubmit': 'Send Message',
    'contact.formSuccess': 'Message sent successfully! Our representatives will contact you shortly.',
    'contact.office': 'State Headquarters Address',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email Address',

    // About Us
    'about.title': 'About Young Democrats',
    'about.missionTitle': 'Our Mission & Vision',
    'about.missionText': 'We exist to bridge the gap between regional governance and youth power. Young Democrats is a state-level political platform in Tamil Nadu, mobilizing college students, working professionals, and volunteers to demand reforms in education, employment opportunities, and social equality.',
    'about.leaderTitle': 'State Leadership Committee',
    'about.leaderRole1': 'State Convener & Founder',
    'about.leaderRole2': 'State Co-Convener (Women Wing)',
    'about.leaderRole3': 'State Organizer (Public Relations)',

    // Join Us & Volunteer
    'join.title': 'Join Young Democrats',
    'join.subtitle': 'Become an active member of Tamil Nadu\'s largest progressive youth movement.',
    'join.district': 'Select District',
    'join.wing': 'Select Wing Interest',
    'join.submit': 'Submit Membership Application',
    'join.success': 'Welcome aboard! Your application has been received.',

    // Admin Panel
    'admin.title': 'Admin Dashboard',
    'admin.sidebar.dashboard': 'Dashboard',
    'admin.sidebar.news': 'News Management',
    'admin.sidebar.categories': 'Categories',
    'admin.sidebar.media': 'Media Library',
    'admin.sidebar.speeches': 'Speeches',
    'admin.sidebar.events': 'Events',
    'admin.sidebar.live': 'Live TV / Videos',
    'admin.sidebar.districts': 'Districts',
    'admin.sidebar.users': 'User Management',
    'admin.sidebar.comments': 'Comments',
    'admin.sidebar.newsletter': 'Newsletter Subscribers',
    'admin.sidebar.analytics': 'Analytics',
    'admin.sidebar.settings': 'Settings',
    'admin.sidebar.logout': 'Logout',
    
    // Admin Content
    'admin.stats.totalNews': 'Total Articles',
    'admin.stats.published': 'Published Articles',
    'admin.stats.drafts': 'Drafts',
    'admin.stats.users': 'Total Users',
    'admin.charts.overview': 'Portal Traffic & News Overview (This Month)',
    'admin.charts.distribution': 'Category Wise Distribution',
    'admin.actions.addNews': 'Add News',
    'admin.actions.uploadMedia': 'Upload Media',
    'admin.actions.addEvent': 'Add Event',
    'admin.actions.notify': 'Send Notification',
    'admin.table.title': 'Title',
    'admin.table.category': 'Category',
    'admin.table.status': 'Status',
    'admin.table.date': 'Date',
    'admin.table.actions': 'Actions',

    // Footer
    'footer.badges.fast': 'Fast & Secure',
    'footer.badges.responsive': 'Fully Responsive',
    'footer.badges.privacy': 'Privacy Focused',
    'footer.badges.support': '24/7 Volunteer Support',
    'footer.quickLinks': 'Quick Navigation',
    'footer.newsletter': 'Subscribe to Newsletter',
    'footer.copyright': '© 2026 Young Democrats. All rights reserved. Powered by Youth.'
  },
  ta: {
    // Nav Bar
    'nav.home': 'முகப்பு',
    'nav.news': 'செய்திகள்',
    'nav.speeches': 'சொற்பொழிவுகள்',
    'nav.districts': 'மாவட்டங்கள்',
    'nav.gallery': 'புகைப்படங்கள்',
    'nav.videos': 'காணொளிகள்',
    'nav.events': 'நிகழ்வுகள்',
    'nav.peoplesVoice': 'மக்கள் குரல்',
    'nav.factcheck': 'உண்மைச் சரிபார்ப்பு',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.contact': 'தொடர்புக்கு',
    'nav.membership': 'இணையுங்கள்',
    'nav.volunteer': 'தன்னார்வலர்',
    'nav.liveTv': 'நேரடி ஒளிபரப்பு',
    'nav.admin': 'நிர்வாகத் தளம்',
    'nav.searchPlaceholder': 'செய்திகள், நிகழ்வுகள், உரைகளைத் தேடுக...',

    // Banner & Ticker
    'ticker.breaking': 'முக்கிய செய்திகள்',
    'slogan': 'மக்கள் குரல் மக்களுக்காக',
    'readMore': 'மேலும் வாசிக்க',
    'watchVideo': 'காணொளியைக் காண்க',
    'backToHome': 'முகப்பிற்குச் செல்க',
    'submit': 'சமர்ப்பி',
    'cancel': 'ரத்து செய்',
    'search': 'தேடு',
    'filter': 'வடிகட்டு',
    'all': 'அனைத்தும்',

    // Hero
    'hero.title': 'மக்கள் குரல் மக்களுக்காக!',
    'hero.subtitle': 'இளம் ஜனநாயகவாதிகள் என்பது தமிழ்நாட்டில் சமூக நீதி, சமத்துவம் மற்றும் மாநில வளர்ச்சியை நோக்கமாகக் கொண்டு செயல்படும் முற்போக்கு இளைஞர்களின் இயக்கமாகும்.',

    // Categories
    'cat.partyNews': 'கட்சி செய்திகள்',
    'cat.speeches': 'சொற்பொழிவுகள்',
    'cat.districtNews': 'மாவட்ட செய்திகள்',
    'cat.youthWing': 'இளைஞர் அணி',
    'cat.womensWing': 'மகளிர் அணி',
    'cat.pressRelease': 'செய்திக்குறிப்பு',
    'cat.electionUpdates': 'தேர்தல் செய்திகள்',
    'cat.governmentIssues': 'அரசுப் பிரச்சனைகள்',

    // Titles / Sections
    'sec.spotlight': 'சிறப்பு முன்னிலை',
    'sec.browseCategory': 'வகை வாரியாக செய்திகள்',
    'sec.browseCategorySub': 'குறிப்பிட்ட பிரிவு வாரியாக செய்திகளை வடிகட்டவும்',
    'sec.clearFilter': 'வடிகட்டலை நீக்குக',
    'sec.verifiedReleases': 'அதிகாரப்பூர்வ வெளியீடுகள், மாவட்ட செய்திகள் மற்றும் தலைவர்களின் உரைகள்',
    'sec.latestNews': 'சமீபத்திய செய்திகள்',
    'sec.districtHighlights': 'மாவட்டச் சிறப்புகள்',
    'sec.featuredSpeeches': 'சிறப்பு சொற்பொழிவுகள் & உரைகள்',
    'sec.featuredSpeechesSub': 'மாநில ஒருங்கிணைப்பாளர் மற்றும் அணித் தலைவர்களின் உரைகள் மற்றும் உரைவடிவங்கள்',
    'sec.featuredAddress': 'சிறப்பு உரை',
    'sec.speaker': 'பேச்சாளர்',
    'sec.date': 'தேதி',
    'sec.views': 'பார்வைகள்',
    'sec.playSpeech': 'உரையைக் கேள்',
    'sec.downloadTranscript': 'உரைவடிவத்தை பதிவிறக்கு',
    'sec.mediaGallery': 'புகைப்பட & காணொளித் தொகுப்பு',
    'sec.gallerySub': 'பிரச்சாரங்கள், இளைஞர் மன்றங்கள் மற்றும் பேரணிகளின் களப் புகைப்படங்கள்',
    'sec.viewPhoto': 'படத்தைக் காண்க',
    'sec.eventsSub': 'பேரணிகள், பொதுக் கூட்டங்கள், பிரச்சாரங்கள் மற்றும் தன்னார்வலர் பயிற்சி அட்டவணை',
    'sec.noEvents': 'தற்போது நிகழ்வுகள் எதுவும் திட்டமிடப்படவில்லை. பின்னர் சரிபார்க்கவும்!',
    'sec.districtsSub': 'தமிழகம் முழுவதுமுள்ள மாவட்ட ஒருங்கிணைப்பாளர்கள் மற்றும் தொடர்பு விவரங்கள்',
    'sec.mobilePreview': 'இளம் ஜனநாயகவாதிகள் அலைபேசியில்',
    'sec.mobilePreviewSub': 'எங்களது போர்டல் அனைத்து அலைபேசிகளிலும் மின்னல் வேக செயல்திறன் மற்றும் அழகான வடிவமைப்பிற்கு உகந்ததாக உள்ளது.',
    'sec.mobileFast': 'மின்னல் வேகத் தொடக்கம்',
    'sec.mobileFastSub': 'குறைந்த இணைய வேகத்திலும் விரைவாக இயங்கக் கூடியது.',
    'sec.mobileUi': 'அடாப்டிவ் வடிவமைப்பு',
    'sec.mobileUiSub': 'அலைபேசி திரைகளுக்கேற்ப மிக நேர்த்தியாகப் பொருந்தும்.',
    'sec.mobileSec': 'பாதுகாப்பான அணுகல்',
    'sec.mobileSecSub': 'முழுமையான பாதுகாப்பு நெறிமுறைகள்.',
    'sec.latestUpdates': 'சமீபத்திய புதுப்பிப்புகள்',
    'sec.newsletterTitle': 'தகவல் அறிவோம். எதிர்காலத்தை மேம்படுத்துவோம்.',
    'sec.newsletterSub': 'தலைமையிடமிருந்து நேரடிச் செய்திகளைப் பெற எங்களது வாராந்திர செய்தி மடலுக்குப் பதிவு செய்யவும்.',
    'sec.liveBroadcast': 'நேரடி ஒளிபரப்பு',
    'sec.liveSub': 'சென்னை தலைமையகத்திலிருந்து பொதுக் கூட்டங்கள், மாணவர் மாநாடுகள், மாவட்ட பிரச்சாரங்கள் மற்றும் சிறப்பு நேர்காணல்களை நேரலையில் காணுங்கள். நவீன, சுறுசுறுப்பான ஜனநாயகத்தில் ஈடுபடுங்கள்.',
    'sec.liveBullet1': 'மாநில காடமைப்பு இயக்கத் தொடக்க விழா ஒளிபரப்பு',
    'sec.liveBullet2': 'இளைஞர் மற்றும் மகளிர் அணி அமைப்பாளர்களின் நேர்காணல்கள்',
    'sec.liveClick': 'நேரடி ஒளிபரப்பை இணைக்க கிளிக் செய்யவும்',
    'sec.liveViewers': 'பார்வையாளர்கள் நேரலையில்',

    // Ideology
    'ideo.title': 'நமது அடிப்படைக் கொள்கை',
    'ideo.subtitle': 'இளம் ஜனநாயகவாதிகள் இயக்கத்தின் அடித்தளம் ஆறு ஜனநாயகக் கோட்பாடுகளால் கட்டமைக்கப்பட்டுள்ளது.',
    'ideo.socialJustice': 'சமூக நீதி',
    'ideo.socialJusticeSub': 'சம உரிமைகளை உறுதி செய்தல், நியாயமான வாய்ப்புகள் மற்றும் சாதிய அல்லது சமூக-பொருளாதார பாகுபாடுகளை ஒழித்தல்.',
    'ideo.equality': 'சமத்துவம்',
    'ideo.equalitySub': 'ஒவ்வொரு குடிமகனுக்கும் சமமான கல்வி, வளங்கள் மற்றும் குடிமை உரிமைகள் கிடைக்கும் ஒரு வர்க்கமற்ற சமூகம்.',
    'ideo.secularism': 'மதச்சார்பின்மை',
    'ideo.secularismSub': 'அனைத்து மதத்தினரிடையேயும் நல்லிணக்கத்தையும் அமைதியையும் பேணுதல். கொள்கை முடிவுகளில் மதச் சார்பின்றி இருத்தல்.',
    'ideo.democracy': 'ஜனநாயகம்',
    'ideo.democracySub': 'அடிமட்ட ஆட்சிமுறை, செயலில் உள்ள மாணவர் பிரதிநிதித்துவம் மற்றும் வெளிப்படையான தலைமைக்கு அதிகாரமளித்தல்.',
    'ideo.youthEmpowerment': 'இளைஞர் மேம்பாடு',
    'ideo.youthEmpowermentSub': 'இளைஞர்களுக்கு ஆட்சி முறை, கல்விச் சீர்திருத்தம் மற்றும் தூய்மையான அரசியலில் பயிற்சி அளித்தல்.',
    'ideo.development': 'நிலையான வளர்ச்சி',
    'ideo.developmentSub': 'சுற்றுச்சூழல் சுற்றுச்சூழல் அமைப்புகள், நீர்நிலைகள் மற்றும் காடுகளைப் பாதுகாக்கும் அதே வேளையில் தொழில் வளர்ச்சியை ஊக்குவித்தல்.',

    // Contact Us
    'contact.title': 'தலைமையகத்தைத் தொடர்பு கொள்க',
    'contact.subtitle': 'மாநில ஒருங்கிணைப்புக் குழுவை அணுகவும். எங்கள் அலுவலகங்கள் 24 மணி நேரமும் திறந்திருக்கும்.',
    'contact.formName': 'முழு பெயர்',
    'contact.formEmail': 'மின்னஞ்சல் முகவரி',
    'contact.formPhone': 'தொலைபேசி எண்',
    'contact.formMessage': 'உங்கள் செய்தி / விசாரணை',
    'contact.formSubmit': 'செய்தி அனுப்பு',
    'contact.formSuccess': 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! எங்கள் பிரதிநிதிகள் விரைவில் உங்களைத் தொடர்புகொள்வார்கள்.',
    'contact.office': 'மாநில தலைமையக முகவரி',
    'contact.phone': 'தொலைபேசி எண்',
    'contact.email': 'மின்னஞ்சல் முகவரி',

    // About Us
    'about.title': 'இளம் ஜனநாயகவாதிகள் பற்றி',
    'about.missionTitle': 'எங்கள் நோக்கம் & தொலைநோக்கு',
    'about.missionText': 'மாநில நிர்வாகத்திற்கும் இளைஞர்களின் ஆற்றலுக்கும் இடையே உள்ள பாலமாக நாங்கள் செயல்படுகிறோம். இளம் ஜனநாயகவாதிகள் என்பது தமிழ்நாட்டில் உள்ள கல்லூரி மாணவர்கள், பணிபுரியும் இளைஞர்கள் மற்றும் தன்னார்வலர்களை கல்வி, வேலைவாய்ப்பு மற்றும் சமூக சமத்துவத்திற்கான சீர்திருத்தங்களைக் கோரி திரட்டும் ஒரு மாநில அளவிலான அரசியல் தளமாகும்.',
    'about.leaderTitle': 'மாநில தலைமைக் குழு',
    'about.leaderRole1': 'மாநில ஒருங்கிணைப்பாளர் & நிறுவனர்',
    'about.leaderRole2': 'மாநில இணை ஒருங்கிணைப்பாளர் (மகளிர் அணி)',
    'about.leaderRole3': 'மாநில அமைப்பாளர் (மக்கள் தொடர்பு)',

    // Join Us & Volunteer
    'join.title': 'இளம் ஜனநாயகவாதிகளுடன் இணையுங்கள்',
    'join.subtitle': 'தமிழ்நாட்டின் மிகப்பெரிய முற்போக்கு இளைஞர் இயக்கத்தில் உறுப்பினராகுங்கள்.',
    'join.district': 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
    'join.wing': 'பிரிவைத் தேர்ந்தெடுக்கவும்',
    'join.submit': 'உறுப்பினர் விண்ணப்பத்தைச் சமர்ப்பி',
    'join.success': 'நல்வரவு! உங்கள் விண்ணப்பம் பெறப்பட்டது.',

    // Admin Panel
    'admin.title': 'நிர்வாகத் தளம்',
    'admin.sidebar.dashboard': 'முகப்பு பலகை',
    'admin.sidebar.news': 'செய்தி மேலாண்மை',
    'admin.sidebar.categories': 'வகைகள்',
    'admin.sidebar.media': 'ஊடக நூலகம்',
    'admin.sidebar.speeches': 'சொற்பொழிவுகள்',
    'admin.sidebar.events': 'நிகழ்வுகள்',
    'admin.sidebar.live': 'லைவ் டிவி / காணொளிகள்',
    'admin.sidebar.districts': 'மாவட்டங்கள்',
    'admin.sidebar.users': 'பயனர் மேலாண்மை',
    'admin.sidebar.comments': 'கருத்துகள்',
    'admin.sidebar.newsletter': 'செய்தி மடல் சந்தாதாரர்கள்',
    'admin.sidebar.analytics': 'பகுப்பாய்வு',
    'admin.sidebar.settings': 'அமைப்புகள்',
    'admin.sidebar.logout': 'வெளியேறு',
    
    // Admin Content
    'admin.stats.totalNews': 'மொத்த செய்திகள்',
    'admin.stats.published': 'வெளியிடப்பட்டவை',
    'admin.stats.drafts': 'வரைவுகள்',
    'admin.stats.users': 'மொத்த பயனர்கள்',
    'admin.charts.overview': 'தளப் போக்குவரத்து & செய்தி மேலாண்மை (இந்த மாதம்)',
    'admin.charts.distribution': 'வகை வாரியான பங்கீடு',
    'admin.actions.addNews': 'செய்தி சேர்',
    'admin.actions.uploadMedia': 'ஊடகம் பதிவேற்று',
    'admin.actions.addEvent': 'நிகழ்வு சேர்',
    'admin.actions.notify': 'அறிவிப்பு அனுப்பு',
    'admin.table.title': 'தலைப்பு',
    'admin.table.category': 'பிரிவு',
    'admin.table.status': 'நிலை',
    'admin.table.date': 'தேதி',
    'admin.table.actions': 'செயல்பாடுகள்',

    // Footer
    'footer.badges.fast': 'வேகமான & பாதுகாப்பான',
    'footer.badges.responsive': 'அனைத்து திரைக்கும் உகந்த',
    'footer.badges.privacy': 'தனியுரிமை சார்ந்தது',
    'footer.badges.support': '24/7 தன்னார்வலர் ஆதரவு',
    'footer.quickLinks': 'விரைவு வழிசெலுத்தல்',
    'footer.newsletter': 'செய்தி மடலுக்குப் பதிவு செய்க',
    'footer.copyright': '© 2026 இளம் ஜனநாயகவாதிகள். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. இளைஞர்களின் ஆற்றலால் இயக்கப்படுகிறது.'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ta');

  useEffect(() => {
    const stored = localStorage.getItem('yd_lang') as Language;
    if (stored === 'en' || stored === 'ta') {
      queueMicrotask(() => {
        setLanguageState(stored);
      });
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('yd_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
