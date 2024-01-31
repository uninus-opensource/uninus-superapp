{ pkgs, ... }:

{
  packages = with pkgs; [
    bun
    nodejs

    (writeScriptBin "helpme" ''
      __usage="
      👋 Welcome to UNINUS Development Environment. 🚀
      If you see this message, it means your are inside the Nix shell ❄️.

      [Info]===============================================================>

      Command available:
        - pmbuserdev:     start pmb user project
        - pmbuserbuild:   build pmb user project
        - helpme:         show this messages

      Repository:
        - https://github.com/maulanasdqn/ipos
      [Info]===============================================================>
      "
      echo "$__usage"
    '')

    (writeScriptBin "pmb-user-dev" ''
      bun web:pmb:user:serve
    '')

    (writeScriptBin "pmb-user-build" ''
      bun web:pmb:user:build
    '')

  ];

  enterShell = ''
    helpme
  '';

  languages.typescript.enable = true;

  services.postgres = with pkgs; {
    enable = true;
    package = postgresql_15;
    initialDatabases = [{ name = "uninus-db"; }];
  };

}
