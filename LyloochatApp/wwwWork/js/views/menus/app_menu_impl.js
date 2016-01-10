//Une carte avec du dessin
function AppMenu_Impl(appMenu){
    // ========================================== VARIABLES =================================
    this.appMenu = appMenu;


    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== ABSTRACT ===================================
    // Affiche le menu
    this.show = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    };
    // Affiche le menu
    this.hide = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    };
    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================
}
