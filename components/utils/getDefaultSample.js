export function getDefaultSample(title) {
  switch (title) {
    case "clap_1": return require("../../assets/default_samples/clap_1.wav");
    case "clap_2": return require("../../assets/default_samples/clap_2.wav");
    
    case "fx_1": return require("../../assets/default_samples/fx_1.wav");
    case "fx_2": return require("../../assets/default_samples/fx_2.wav");

    case "kick_1": return require("../../assets/default_samples/kick_1.wav");
    case "kick_2": return require("../../assets/default_samples/kick_2.wav");

    case "shaker_1": return require("../../assets/default_samples/shaker_1.wav");
    case "shaker_2": return require("../../assets/default_samples/shaker_2.wav");
    case "shaker_3": return require("../../assets/default_samples/shaker_3.wav");

    case "snare_1": return require("../../assets/default_samples/snare_1.wav");
    case "snare_2": return require("../../assets/default_samples/snare_2.wav");

    case "tom_1": return require("../../assets/default_samples/tom_1.wav");
    case "tom_2": return require("../../assets/default_samples/tom_2.wav");
    case "tom_3": return require("../../assets/default_samples/tom_3.wav");
    case "tom_4": return require("../../assets/default_samples/tom_4.wav");
  }
}
