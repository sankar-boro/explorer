use std::process::Command;
use std::io::{stdout, Write};
use curl::easy::Easy;

fn curl_request() {
    let mut easy = Easy::new();
    easy.url("https://www.rust-lang.org/").unwrap();
    easy.write_function(|data| {
        stdout().write_all(data).unwrap();
        Ok(data.len())
    }).unwrap();
    easy.perform().unwrap();

    println!("{}", easy.response_code().unwrap());
}

fn cmd_issue() {
    let mut cmd = Command::new("ls");
    cmd.arg("-la");
    let out = cmd.output().expect("failed to execute process");
    println!("{}", String::from_utf8_lossy(&out.stdout));
}

fn main() {
    curl_request()
}
