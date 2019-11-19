export class Constants {
    public static validationSignUpMessage = {
        firstName: [
            {type: 'required', message: '* require.'}
        ],
        lastName: [
            {type: 'required', message: '* require.'}
        ],
        email: [
            { type: 'required', message: '* require.' },
            { type: 'pattern', message: 'Error, Please enter a valid email address.' }
        ],
        phone: [
            { type: 'required', message: '* require.' },
            { type: 'pattern', message: 'Error, Please enter a valid phone number.' }
        ],
        password: [
            { type: 'required', message: '* require.' },
            { type: 'minlength', message: 'Error, Password must be at least 8 characters long.' }
        ],
        cpassword: [
            { type: 'required', message: '* require.' },
            { type: 'minlength', message: 'Error, Password must be at least 8 characters long.' },
            { type: 'mustMatch', message: 'Error, Mismatch password. Please check it.' }
        ]

    };

    public static tooltipDawnTheme = "Dawn Mode  (Go Light)";
    public static tooltipDuskTheme = "Dusk Mode  (Go Dark)";

    public static duskTheme = 'dusk-theme';
    public static dawnTheme = 'dawn-theme';

    public static msgAddSongToPlayList = 'Song was successfully added to playlist';
    public static msgRemoveSongToPlayList = 'Song was successfully removed to playlist';

    public static msgSongPlayed = 'Song was played';
    public static msgSongPaused = 'Song was paused';
    public static msgSongStopped = 'Song was stopped';
    public static msgNoSongPlayList = "There isn't no more song to play on the playlist";
    public static msgEmptiedPlayList = "There isn't any song on the playlist. You have to add songs on the playlist";

    public static unitScreen = 'px';

    public static expandSideBarWidth = 270;
    public static collapseSideBarWidth = 70;
    public static noneSideBarWidth = 0;

    public static playBarHeight = 80;
    public static nonePlayBarHeight = 0;

    public static screenResolution = {
        'xl': 'XL',
        'lg': 'LG',
        'md': 'MD',
        'sm': 'SM',
        'xs': 'XS'
    }

}
