{ pkgs, ... }:

{
  env.GREET = "Welcome To UNINUS-DevEnv!";
  packages = with pkgs; [ nodejs bun ];
  scripts.hello.exec = "echo $GREET";
  languages.typescript.enable = true;

  services.postgres = with pkgs; {
    enable = true;
    package = postgresql_15;
    initialDatabases = [{ name = "uninus-db"; }];
  };

  enterShell = ''
    hello
  '';
}
